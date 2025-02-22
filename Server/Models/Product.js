const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    main_category: {
      type: String,
      required: true,
    },
    sub_category: {
      type: String,
    },
    ratings: {
      type: Number,
    },
    no_of_ratings: {
      type: Number,
    },
    actual_price: {
      type: Number,
    },
    discount_price: {
      type: Number,
    },
    product_link: {
      type: String,
    },
    images: [{ type: String }],
  },
  { timestamps: true, collection: "All Products" }
);

module.exports.Product = mongoose.model("Product", productSchema);
