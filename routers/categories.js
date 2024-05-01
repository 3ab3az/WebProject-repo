const Product = require("../models/product");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const productlist = await Product.find();

  if (!productlist) {
    res.status(500).json({
      success: false,
    });
  }
  res.json(productlist);
});

router.post(`/`, (req, res) => {
  const product = new Product({
    ProductName: req.body.ProductName,
    image: req.body.image,
    Descreption: req.body.Descreption,
    price: req.body.price,
    Quantity: req.body.Quantity,
  });
  product
    .save()
    .then((createdproduct) => {
      res.status(201).json(createdproduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        Success: false,
      });
    });
});

module.exports = router;
