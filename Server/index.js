const express = require("express");
const App = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

App.use(cors());
App.options("*", cors());

//Middlewares
App.use(bodyParser.json());
App.use(express.json());

//Routes

const productRoutes = require("./Routes/products");
const imageUploadRoutes = require("./Helper/imageUpload");
const categoryRoutes = require("./Routes/categories");
const userRoutes = require("./Routes/users");
const cartRoutes = require("./Routes/userCart");
const interactionRoutes = require("./Routes/interactions");

App.use("/uploads", express.static("uploads"));
App.use("/api/products/upload", productRoutes);
App.use("/api/products", productRoutes);
App.use("/api/products/filter", productRoutes);
App.use("/api/category", categoryRoutes);
App.use("/api/imageUpload", imageUploadRoutes);
App.use("/api/users", userRoutes);
App.use("/api/cart", cartRoutes);
App.use("/api/interactions", interactionRoutes);

App.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Opener-Policy"); // Remove the header
  next();
});

//Database
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database connection is ready...");

    //Server
    App.listen(process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err, "This is occured");
  });
