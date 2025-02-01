const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const { Product } = require("../Models/Product");
const cloudinary = require("cloudinary").v2;
const { ImageUpload } = require("../Models/imageUpload");
const { compare } = require("bcryptjs");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("images"), async (req, res) => {
  try {
    console.log("recieved files", req.files);
    const uploadPromises = req.files.map(async (file) => {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: false,
      };

      const result = await cloudinary.uploader.upload(file.path, options);
      fs.unlinkSync(file.path); // Remove file after upload
      return result.secure_url;
    });

    const imagesArr = await Promise.all(uploadPromises);

    const imagesUploaded = new ImageUpload({ images: imagesArr });
    await imagesUploaded.save();

    return res.status(200).json({ success: true, images: imagesArr });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to upload images" });
  }
});

// router.get("/", async (req, res) => {
//   const { company, page = 1, limit = 20 } = req.query; //defaults: page 1, 10 products
//   const query = company && company !== "All" ? { company } : {};
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;

//   try {
//     const products = await Product.find(query)
//       .skip(startIndex)
//       .limit(Number(limit));

//     const total = await Product.countDocuments(query);
//     if (!products || products.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No products found" });
//     }

//     // const CategoryData = createCategory(products);

//     return res.status(200).json({ products, total });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// });

router.get("/filter", async (req, res) => {
  const {
    search = "",
    page = 1,
    limit = 10,
    company = "All",
    selection = "Featured",
  } = req.query;

  let query = search ? { name: { $regex: search, $options: "i" } } : {};

  if (company !== "All") {
    query.company = company;
  }

  let sortOption = {};
  if (selection === "Low->High") {
    sortOption.discount_price = 1; // Ascending order
  } else if (selection === "High->Low") {
    sortOption.discount_price = -1; // Descending order
  } else if (selection === "Featured") {
    sortOption.ratings = -1; // Descending order
  } else if (selection === "Popular") {
    sortOption.no_of_ratings = -1;
  }

  const startIndex = (page - 1) * limit;

  try {
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(startIndex)
      .limit(Number(limit));

    // Count total documents
    const total = await Product.countDocuments(query);

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }

    return res.status(200).json({ products, total });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res
      .status(404)
      .json({ message: "The product with the givern Id was not found." });
  }

  return res.status(200).send(product);
});

module.exports = router;

// const createCategory = (products) => {
//   const categoryMap = {};

//   products.forEach((product) => {
//     const { main_category: category, sub_category: subCategory } = product;

//     if (!categoryMap[category]) {
//       categoryMap[category] = {
//         name: category,
//         subCategories: {},
//       };
//     }

//     if (subCategory) {
//       if (!categoryMap[category].subCategories[subCategory]) {
//         categoryMap[category].subCategories[subCategory] = {
//           name: subCategory,
//           products: [],
//         };
//       }

//       categoryMap[category].subCategories[subCategory].products.push(product);
//     }
//   });

//   const categoryList = Object.values(categoryMap).map((category) => ({
//     name: category.name,
//     subCategories: Object.values(category.subCategories),
//   }));

//   return categoryList;
// };

// router.get("/count", async (req, res) => {
//   try {
//     const total = await Product.countDocuments();
//     // const Company = await Product.find({ company: req.params });

//     if (!total || total.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No products found" });
//     }
//     // if (!Company || Company.length === 0) {
//     //   return res
//     //     .status(404)
//     //     .json({ success: false, message: "No products found" });
//     // }

//     return res.status(200).json({ total });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const {
//       search = "",
//       page = 1,
//       limit = 10,
//       company = "All",
//       selection = "Featured",
//     } = req.query;

//     const products = await Product.find();
//     let filteredProducts = products.filter((product) => {
//       const searchMatch = search
//         ? product.name.toLowerCase().includes(search.toLowerCase())
//         : true;
//       const companyMatch = company ? product.company === company : true;
//       return searchMatch && companyMatch;
//     });

//     console.log("products");
//     console.log(filteredProducts);

//     switch (selection) {
//       case "Featured":
//         console.log("Featured");
//         break;
//       case "Low->High":
//         filteredProducts.sort((a, b) => a.price - b.price);
//         break;
//       case "High->Low":
//         filteredProducts.sort((a, b) => b.price - a.price);
//         break;
//       case "Popular":
//       default:
//         filteredProducts.sort((a, b) => {
//           if (a.rating === undefined) return 1; // a comes after b
//           if (b.rating === undefined) return -1; // b comes after a

//           return b.rating - a.rating;
//         });
//         break;
//     }

//     const startIndex = (page - 1) * limit;
//     const paginated = filteredProducts.slice(
//       startIndex,
//       startIndex + parseInt(limit)
//     );

//     res.json({ products: paginated, total: filteredProducts.length });
//   } catch (error) {
//     console.error("Error in /products route:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
