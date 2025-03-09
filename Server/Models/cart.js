const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
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
  { timestamps: true, collection: "UserCart" }
);

module.exports = mongoose.model("Cart", CartSchema);
