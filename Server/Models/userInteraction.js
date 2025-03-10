const mongoose = require("mongoose");

const userInteractionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: {
    type: String,
    ref: "Product",
    required: true,
  },
  eventType: {
    type: String,
    enum: ["view", "cart", "wishlist"],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserInteraction", userInteractionSchema);
