const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
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
    description: {
      type: String,
    },
    delivery: {
      type: Number,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, collection: "All Products" }
);

module.exports.Product = mongoose.model("Product", productSchema);
