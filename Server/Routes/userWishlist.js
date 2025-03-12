const express = require("express");
const WishList = require("../Models/wishList");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const wishList = (await WishList.findOne({ userId: req.params.userId })) || {
      items: [],
    };
    res.status(200).json(wishList);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { userId, product } = req.body;
    let wishList = await WishList.findOne({ userId });

    if (!wishList) {
        wishList = new WishList({ userId, items: [product] });
    } else {
      const productExists = wishList.items.some(
        (item) => item.productId === product.productId
      );

      if (!productExists) {
        wishList.items.push(product);
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Product already in wishList" });
      }
    }

    await wishList.save();
    res.status(200).json(wishList);
  } catch (error) {
    console.error("Error adding to wishList:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/remove/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    let wishList = await WishList.findOne({ userId });

    if (!wishList) {
      return res
        .status(404)
        .json({ success: false, message: "WishList not found" });
    }

    const filteredItems = wishList.items.filter(
      (item) => item.productId.toString() !== productId
    );

    if (filteredItems.length === wishList.items.length) {
      return res
        .status(404)
        .json({ success: false, message: "Product not in wishList" });
    }

    wishList.items = filteredItems;
    await wishList.save();

    res.status(200).json(wishList);
  } catch (error) {
    console.error("Error removing from wishList:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
