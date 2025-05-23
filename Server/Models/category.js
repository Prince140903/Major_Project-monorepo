const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
    color: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    parentId: {
      type: String,
    },
  },
  { timestamps: true, collection: "categories" }
);

categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

categorySchema.set("toJSON", {
  virtuals: true,
});

exports.Category = mongoose.model("Category", categorySchema);
exports.categorySchema = categorySchema;
