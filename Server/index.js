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

const userRoutes = require("./Routes/users");
const productRoutes = require("./Routes/products");
const imageUploadRoutes = require("./Helper/imageUpload");
const categoryRoutes = require("./Routes/categories");

// App.use("/api/products/upload", productRoutes);

App.use("/uploads", express.static("uploads"));
App.use("/api/products", productRoutes);
App.use("/api/products/filter", productRoutes);
App.use("/api/category", categoryRoutes);
// App.use("/products", productRoutes);
// App.use("/api/products/search", productRoutes);
App.use("/api/imageUpload", imageUploadRoutes);
// App.use("/:id", productRoutes);

App.use("/:id", productRoutes);
App.use("/api/users", userRoutes);
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
