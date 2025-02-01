const { Category } = require("../Models/category");
const { ImageUpload } = require("../Models/imageUpload");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

var imagesArr = [];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("images"), async (req, res) => {
  imagesArr = [];

  try {
    for (let i = 0; i < req?.files?.length; i++) {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: false,
      };

      const img = await cloudinary.uploader.upload(
        req.files[i].path,
        options,
        function (error, result) {
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`Uploads/${req.files[i].filename}`);
        }
      );

      let imagesUploaded = new ImageUpload({
        images: imagesArr,
      });

      imagesUploaded = await imagesUploaded.save();
      return res.status(200).json(imagesArr);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/create", async (req, res) => {
  let catObj = {};

  if (imagesArr.length > 0) {
    catObj = {
      name: req.body.name,
      images: imagesArr,
      color: req.body.color,
    };
  } else {
    catObj = {
      name: req.body.name,
    };
  }

  if (req.body.parentId) {
    catObj.parentId = req.body.parentId;
  }

  let category = new Category(catObj);

  if (!category) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }

  category = await category.save();
  imagesArr = [];

  res.status(201).json(category);
});

const createCategories = (categories, parentId = null, visited = new Set()) => {
  const filteredCategories = categories.filter((cat) =>
    parentId ? cat.parentId === parentId : !cat.parentId
  );

  if (filteredCategories.length === 0) return [];

  // Build category list
  return filteredCategories.map((cat) => {
    if (visited.has(cat._id)) {
      throw new Error(`Circular reference detected for category ${cat._id}`);
    }

    // Add the current category ID to the visited set
    visited.add(cat._id);

    return {
      _id: cat._id,
      name: cat.name,
      images: cat.images,
      color: cat.color,
      children: createCategories(categories, cat._id, new Set(visited)), // Pass a new Set to avoid mutation
    };
  });
};

router.get("/", async (req, res) => {
  try {
    const categoryList = await Category.find();

    if (categoryList) {
      const categoryData = createCategories(categoryList);

      return res.status(200).json({
        categoryList: categoryData,
      });
    } else {
      res.status(500).json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/get/count", async (req, res) => {
  const categoryCount = await Category.countDocuments({ parentId: undefined });

  if (!categoryCount) {
    res.status(500).json({ success: false });
  } else {
    res.send({
      categoryCount: categoryCount,
    });
  }
});

router.get("/subCat/get/count", async (req, res) => {
  const category = await Category.fing();

  if (!category) {
    res.status(500).json({ success: false });
  } else {
    const subCatList = [];

    for (let cat of category) {
      if (cat.parentId !== undefined) {
        subCatList.push(cat);
      }
    }

    res.send({
      categoryCount: subCatList.length,
    });
  }
});

router.get("/:id", async (req, res) => {
  categoryEditId = req.params.id;

  const category = await Category.findById(req.params.id);

  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the givern Id was not found." });
  }

  return res.status(200).send(category);
});

router.delete("/deleteImage", async (req, res) => {
  const imgUrl = req.query.img;

  const urlArr = imgUrl.split("/");
  const image = urlArr[urlArr.length - 1];

  const response = await cloudinary.uploader.destroy(
    imageName,
    (error, result) => {
      console.log(error, result);
    }
  );

  if (response) {
    res.status(200).send(response);
  }
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  const images = category.images;

  for (img of images) {
    const imgUrl = img;
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    cloudinary.uploader.destroy(imageName, (error, result) => {
      console.log(error, result);
    });
  }

  const deletedCat = await Category.findByIdAndDelete(req.params.id);

  if (!deletedCat) {
    res
      .status(404)
      .json({ message: "The category not found.", success: false });
  }

  res.status(200).json({
    success: true,
    message: "Category deleted",
  });

  return res.status(200).send(category);
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      images: req.body.images,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category) {
    return res.status(500).json({
      message: "The category with the givern Id was not found.",
      success: false,
    });
  }

  imagesArr = [];

  res.send(category);
});

module.exports = router;

// const categoryList = [];
// let category;
// if (parentId == null) {
//   // category = categories.filter(
//   //   (cat) => cat.parentId == null || cat.parentId === undefined
//   // );
//   category = categories.filter((cat) => !cat.parentId);
//   console.log("No parentId: ", category);
// } else {
//   category = categories.filter((cat) => cat.parentId === parentId);
//   console.log("parentId: ", category);
// }

// for (let cat of category) {
//   categoryList.push({
//     _id: cat._id,
//     name: cat.name,
//     images: cat.images,
//     color: cat.color,
//     children: createCategories(categories, cat._id),
//   });
// }
// return categoryList;
