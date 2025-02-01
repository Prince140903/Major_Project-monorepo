const { Users } = require("../models/users");
const { ImageUpload } = require("../Models/imageUpload");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const multer = require("multer"); //for image upload
const fs = require("fs");

const { error } = require("console");

const cloudinary = require("cloudinary").v2;

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
router.post(`/upload`, upload.array("images"), async (req, res) => {
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
          fs.unlinkSync(`uploads/${req.files[i].filename}`);
        }
      );
    }

    let imageUploaded = new imageUploadSchema({
      images: imagesArr,
    });
    imageUploaded = await imageUploaded.save();
    return res.status(200).json(imagesArr);
  } catch (error) {
    console.log(error);
  }
});

router.post(`/signup`, async (req, res) => {
  const { name, phone, email, password, isAdmin } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    const existingUserByph = await User.findOne({ phone: phone });
    if (existingUser) {
      res.status(400).json({ error: true, msg: "user already exist!" });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const result = await User.creat({
        name: name,
        phone:phone,
        email: email,
        password: hashPassword,
        isAdmin: isAdmin,
      });
      const token = jwt.sign(
        { email: result.email, id: result.id },
        process.env.JSON_WEB_TOKEN_SECRET_KEY
      );
      res.status(200).json({
        user: result,
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something went Wrong " });
  }
});

router.post(`/signin`, async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      res.status(404).json({ error: true, msg: "User Not Found!" });
    } else {
      const matchPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!matchPassword) {
        return res.status(400).json({ error: true, msg: "Password wrong" });
      }
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser.id },
        process.env.JSON_WEB_SECRET_KEY
      );
      return res.status(200).send({
        user: existingUser,
        token: token,
        msg: "User Login Successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something Went Wrong" });
  }
});

module.exports = router;
