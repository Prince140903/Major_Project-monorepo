const { User } = require("../Models/user");
const { ImageUpload } = require("../Models/imageUpload");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const multer = require("multer"); //for image upload
const fs = require("fs");

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

    let imagesUploaded = new ImageUpload({
      images: imagesArr,
    });

    imagesUploaded = await imagesUploaded.save();
    return res.status(200).json(imagesArr);
  } catch (error) {
    console.log(error);
  }
});

router.post(`/signUp`, async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(400).json({ error: true, msg: "user already exist!" });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const result = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        isAdmin: isAdmin,
      });

      const token = jwt.sign(
        { email: result.email, id: result._id },
        process.env.JSON_WEB_TOKEN_SECRET_KEY
      );
      res.status(200).json({
        error: false,
        user: result,
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({ error: true, msg: "Something went Wrong " });
  }
});

router.post(`/signIn`, async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ error: true, msg: "User Not Found!" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      console.log("are you here?");
      return res.status(400).json({ error: true, msg: "Incorrect Password" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY
    );
    return res.status(200).send({
      user: existingUser,
      token: token,
      msg: "User Login Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ error: true, msg: "Something Went Wrong" });
  }
});

router.post(`/authWithGoogle`, async (req, res) => {
  const { name, email, images, isAdmin } = req.body; // Removed `password`

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // If the user does NOT exist, create a new user
      user = await User.create({
        name,
        email,
        images,
        isAdmin: isAdmin || false, // Ensure only intended users are admins
      });
    }

    // Generate token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY
    );

    return res.status(200).send({
      user,
      token,
      msg: "User Login Successfully!",
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = router;
