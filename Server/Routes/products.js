const express = require("express");
const multer = require("multer");
const router = express.Router();
const { Product } = require("../Models/Product");
const cloudinary = require("cloudinary").v2;
const { ImageUpload } = require("../Models/imageUpload");

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// const createCategory = (products) => {
//   const categoryMap = {};

//   products.forEach((product) => {
//     const { main_category: category, sub_category: subCategory } = product;

//     if (!categoryMap[category]) {
//       categoryMap[category] = {
//         name: category,
//         subCategories: {},
//       };
//     }

//     if (subCategory) {
//       if (!categoryMap[category].subCategories[subCategory]) {
//         categoryMap[category].subCategories[subCategory] = {
//           name: subCategory,
//           products: [],
//         };
//       }

//       categoryMap[category].subCategories[subCategory].products.push(product);
//     }
//   });

//   const categoryList = Object.values(categoryMap).map((category) => ({
//     name: category.name,
//     subCategories: Object.values(category.subCategories),
//   }));

//   return categoryList;
// };

router.post("/upload", upload.array("images"), async (req, res) => {
  imagesArr = [];

  try {
    for (let i = 0; i < req?.files?.length; i++) {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: false,
      };

      const img = await cloudinary.uploader.upload(
        req.files[i].path,
        options,
        function (error, result) {
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`Uploads/${req.files[i].filename}`);
        }
      );

      let imagesUploaded = new ImageUpload({
        images: imagesArr,
      });

      imagesUploaded = await imagesUploaded.save();
      return res.status(200).json(imagesArr);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query; //defaults: page 1, 10 products
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const products = await Product.find().skip(startIndex).limit(Number(limit));
    // console.log(products);
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }

    // const CategoryData = createCategory(products);

    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res
      .status(404)
      .json({ message: "The product with the givern Id was not found." });
  }

  return res.status(200).send(product);
});

/*//'api/products'
router.get(`/`, async (req, res) => {  //created by a . v 27 15.6 directly shown by him
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage);
  const totalPosts = await Product.countDocuments();
  const totalPages = Math.ceil(totalPosts / perPage);

  if (page > totalPages) {
    return res.status(404).json({ message: "page not found" });
  }
  let productList = []; // there is new section i think you did no done yet .
  if (
    req.query.location !== "" &&
    req.query.location !== undefined &&
    req.query.location !== null
  )
  {
    productlist = await Product.find({ location: req.query.location })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
  }
  else
  {
    productlist = await Product.find()
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
  
  }

  return res.status(200).json
  ({
    products: productList,
    totalPages: totalPages,
    page: page,
  });
});

//'/api/products/catName?caatName="fashion'
router.get(`/catName`, async (req, res) => {
  
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage);
  const totalPosts = await Product.countSocuments();
  const totalPages = Math.ceil(totalPosts / perPage);
  if (page > totalPages) {
    return res.status(404).json({
      message: "page Not Found "
    });
    
  }

  let productList = [];
  
  productList = await Product.find({
    location: req.query.location,
    catName: req.query.catName,
  })
    .populate("category")
    .skip(page - 1 * perPage)
    .limit(perPage)
    .exec();
  return res.status(200).json({
    products: productList,
    totalPages: totalPages,
    page: page,
  });
  

});


router.get(`/catId`, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage);
  const totalPosts = await Product.countSocuments();
  const totalPages = Math.ceil(totalPosts / perPage);
  if (page > totalPages) {
    return res.status(404).json({
      message: "page Not Found ",
    });
  }

  let productList = [];
  
    productList = await Product.find({
      location: req.query.location,
      catName: req.query.catId,
    })
      .populate("category")
      .skip(page - 1 * perPage)
      .limit(perPage)
      .exec();
  
  return res.status(200).json({
    products: productList,
    totalPages: totalPages,
    page: page,
  });
});



router.get(`/subCatId`, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage);
  const totalPosts = await Product.countSocuments();
  const totalPages = Math.ceil(totalPosts / perPage);
  if (page > totalPages) {
    return res.status(404).json({
      message: "page Not Found ",
    });
  }

  let productList = [];
  productList = await Product.find({
    location: req.query.location,
    catName: req.query.subCatId,
  })
    .populate("category")
    .skip(page - 1 * perPage)
    .limit(perPage)
    .exec();
  return res.status(200).json({
    products: productList,
    totalPages: totalPages,
    page: page,
  });
});

router.get(`/filterByPrice`, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage);
  const totalPosts = await Product.countSocuments();
  const totalPages = Math.ceil(totalPosts / perPage);
  if (page > totalPages) {
    return res.status(404).json({
      message: "page Not Found ",
    });
  }

  let productList = [];
  if (req.query.catId !== "") {
    productList = await Product.find({
      catId: req.query.catId,
      location: req.query.location,
    })
      .populate("category")
      .skip(page - 1 * perPage)
      .limit(perPage)
      .exec();
  } else if (req.query.subCatId !== "") {
    productList = await Product.find({
      subCatId: req.query.subCatId,
      location: req.query.location,
    })
      .populate("category")
      .skip(page - 1 * perPage)
      .limit(perPage)
      .exec();
  }
  const filteredProducts = productList.filter((product) => {
    if (req.query.miniPrice && product.price < parseInt(+req.query.miniPrice)) {
      return false;
    }
     if (
       req.query.miniPrice &&
       product.price < parseInt(+req.query.miniPrice)
     ) {
       return false;
    }
    return false;
  })
    
  
  
  return res.status(200).json({
    products: productList,
    totalPages: totalPages,
    page: page,
  });
});


router.get(`/rating`, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage);
  const totalPosts = await Product.countSocuments();
  const totalPages = Math.ceil(totalPosts / perPage);
  if (page > totalPages) {
    return res.status(404).json({
      message: "page Not Found ",
    });
  }

  let productList = [];
  if (req.query.catId !== "") {
    console.log  // 17.34
    productList = await Product.find({
      catId: req.query.catId,
      location: req.query.location,
    })
      .populate("category")
      .skip(page - 1 * perPage)
      .limit(perPage)
      .exec();
  } else if (req.query.subCatId !== "") {
    productList = await Product.find({
      subCatId: req.query.subCatId,
      location: req.query.location,
    })
      .populate("category")
      .skip(page - 1 * perPage)
      .limit(perPage)
      .exec();
  }
  const filteredProducts = productList.filter((product) => {
    if (req.query.miniPrice && product.price < parseInt(+req.query.miniPrice)) {
      return false;
    }
    if (req.query.miniPrice && product.price < parseInt(+req.query.miniPrice)) {
      return false;
    }
    return false;
  });

  return res.status(200).json({
    products: productList,
    totalPages: totalPages,
    page: page,
  });
});*/

module.exports = router;
