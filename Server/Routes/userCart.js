const express = require("express");
const Cart = require("../Models/cart");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const cart = (await Cart.findOne({ userId: req.params.userId })) || {
      items: [],
    };
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { userId, product } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [product] });
    } else {
      const productExists = cart.items.some(
        (item) => item.productId === product.productId
      );

      if (!productExists) {
        cart.items.push(product);
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Product already in cart" });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/remove/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const filteredItems = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    if (filteredItems.length === cart.items.length) {
      return res
        .status(404)
        .json({ success: false, message: "Product not in cart" });
    }

    cart.items = filteredItems;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
