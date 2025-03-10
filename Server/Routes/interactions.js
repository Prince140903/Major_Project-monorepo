const express = require("express");
const router = express.Router();
const UserInteraction = require("../Models/userInteraction");

// POST: Save a user interaction
router.post("/track", async (req, res) => {
  try {
    const { userId, productId, eventType } = req.body;

    if (!userId || !productId || !eventType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const interaction = new UserInteraction({ userId, productId, eventType });
    await interaction.save();

    res.status(201).json({ message: "Interaction recorded successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving interaction", error });
  }
});

module.exports = router;
