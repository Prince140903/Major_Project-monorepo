const express = require("express");
const App = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

App.use(cors());
App.options("*", cors());

//Middlewares
App.use(bodyParser.json());
App.use(express.json());

//Routes
const categoryRoutes = require("./Routes/categories");

App.use("/Uploads", express.static("uploads"));
App.use("/api/category", categoryRoutes);

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
