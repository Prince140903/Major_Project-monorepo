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
      type: String,
    },
    no_of_ratings: {
      type: String,
    },
    actual_price: {
      type: String,
    },
    discount_price: {
      type: String,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true, collection: "All Products" }
);

module.exports.Product = mongoose.model("Product", productSchema);
