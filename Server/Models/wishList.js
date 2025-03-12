const mongoose = require("mongoose");

const WishListSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: String,
        name: String,
        actual_price: Number,
        discount_price: Number,
        delivery: Number,
        quantity: Number,
        image: String,
      },
    ],
  },
  { timestamps: true, collection: "UserWishList" }
);

module.exports = mongoose.model("WishList", WishListSchema);
