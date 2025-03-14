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

var imagesArr = [];

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
    // console.log("recieved files", req.files);
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

router.get("/", async (req, res) => {
  const { company, page = 1, limit = 20 } = req.query; //defaults: page 1, 10 products
  const query = company && company !== "All" ? { company } : {};
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const products = await Product.find(query)
      .skip(startIndex)
      .limit(Number(limit));

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

router.post("/create", async (req, res) => {
  let prodObj = {};

  if (req.body) {
    prodObj = {
      name: req.body.name,
      main_category: req.body.main_category,
      sub_category: req.body.sub_category,
      ratings: req.body.ratings,
      no_of_ratings: req.body.no_of_ratings,
      actual_price: req.body.actual_price,
      discount_price: req.body.discount_price,
      product_link: req.body.product_link,
      images: req.body.images,
      description: req.body.description,
      tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    };
  } else {
    console.log("error");
  }

  console.log("product: ", prodObj);
  let product = new Product(prodObj);

  if (!product) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }

  product = await product.save();
  console.log("Product after save: ", product);
  imagesArr = [];

  res.status(201).json(product);
});

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
      .json({ message: "The product with the given Id was not found." });
  }

  return res.status(200).send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  const images = product.images;

  for (img of images) {
    const imgUrl = img;
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    cloudinary.uploader.destroy(imageName, (error, result) => {
      console.log(error, result);
    });
  }

  const deletedProd = await Product.findByIdAndDelete(req.params.id);

  if (!deletedProd) {
    res.status(404).json({ message: "The product not found!", success: false });
  }

  res.status(200).json({
    success: true,
    msg: "Product Deleted",
    data: deletedProd,
  });
});

module.exports = router;