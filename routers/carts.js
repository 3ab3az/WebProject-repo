const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const {Product} = require('../models/product');

// Route to get user's cart
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/:userId/add", async (req, res) => {
 // try {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;

    // Retrieve the product from the database
    const product = await Product.findById(productId);

    // Check if the product exists and if there is enough stock
    if (!product || product.stock < quantity) {
      return res
        .status(400)
        .json({ message: "Insufficient stock for the requested quantity." });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already exists in cart
    const index = cart.items.findIndex((item) => item.productId == productId);
    if (index !== -1) {
      // Check if adding more of this item exceeds available stock
      if (product.stock< cart.items[index].quantity + quantity) {
        return res
          .status(400)
          .json({ message: "Adding this quantity exceeds available stock." });
      }
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
});

// Add routes for removing items, updating quantities, etc.

module.exports = router;
