const express = require("express");
const router = express.Router();
const { Product } = require("../Models/Product");

const createCategory = (products) => {
  const categoryMap = {};

  products.forEach((product) => {
    const { main_category: category, sub_category: subCategory } = product;

    if (!categoryMap[category]) {
      categoryMap[category] = {
        name: category,
        subCategories: {},
      };
    }

    if (subCategory) {
      if (!categoryMap[category].subCategories[subCategory]) {
        categoryMap[category].subCategories[subCategory] = {
          name: subCategory,
          products: [],
        };
      }

      categoryMap[category].subCategories[subCategory].products.push(product);
    }
  });

  const categoryList = Object.values(categoryMap).map((category) => ({
    name: category.name,
    subCategories: Object.values(category.subCategories),
  }));

  return categoryList;
};

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }

    const CategoryData = createCategory(products);

    return res.status(200).json({ categories: CategoryData });
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

module.exports = router;
