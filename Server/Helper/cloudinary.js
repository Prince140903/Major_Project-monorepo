const cloudinary = require("cloudinary").v2;

const upload = cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

module.exports = upload;
