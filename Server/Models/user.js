const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSon", {
  virtual: true,
});

exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;
