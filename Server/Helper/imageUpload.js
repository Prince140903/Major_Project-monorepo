const express = require("express");
const router = express.Router();
const { ImageUpload } = require("../Models/imageUpload");

router.get("/", async (req, res) => {
  try {
    const imageUploadList = await ImageUpload.find();
    if (!imageUploadList) {
      res.status(500).json({ success: false });
    }

    return res.status(200).json(imageUploadList);
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

router.delete("/deleteAllImages", async (req, res) => {
  const images = await ImageUpload.find();
  let deletedImage;

  if (images.length !== 0) {
    for (let image of images) {
      deletedImage = await ImageUpload.findByIdAndDelete(image._id);
    }
  }

  res.json(deletedImage);
});

module.exports = router;
