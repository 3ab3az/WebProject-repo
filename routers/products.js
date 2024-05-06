const { Category } = require("../models/category");
const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();
const mongoose =require('mongoose');

router.get(`/`, async (req, res) => {
  const productList = await Product.find();
  if (!productList) {
    res.status(500).json({
      success: false,
    });
  }
  res.json(productList);
});
//Retrieves a single product by its ID.
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "categoryOfProduct"
  );

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});
//test function

router.post("/", async (req, res) => {
  let product = new Product(
    {
      productName: req.body.productName,
      description: req.body.description,
      image: req.body.image,
      moreImages: req.body.moreImages,
      price: req.body.price,
      Quantity: req.body.Quantity,
      categoryOfProduct: req.body.categoryOfProduct,
      rating: req.body.rating,
      Reviews: req.body.Reviews,
      isFeatured: req.body.isFeatured,
    }
    // { new: true }
  );
  product = await product.save();

  if (!product) return res.status(400).send("the user cannot be created!");

  res.send(product);
});

//Updates an existing product by its ID. It expects updated product data in the request body.
router.put("/:id", async (req, res) => {
  // const ProductExist = await Product.findById(req.params.id);

  if (!Product.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      productName: req.body.productName,
      description: req.body.description,
      image: req.body.image,
      moreImages: req.body.moreImages,
      price: req.body.price,
      Quantity: req.body.Quantity,
      categoryOfProduct: req.body.categoryOfProduct,
      rating: req.body.rating,
      Reviews: req.body.Reviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product) return res.status(500).send("the product cannot be updated!");

  res.send(product);
});
//delete by id
router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the product is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "product not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

//the total count of products.
router.get(`/get/count`, async (req, res) => {
  const productCount = await Product.countDocuments((count) => count);

  if (!productCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    productCount: productCount,
  });
});

//number of featured products.
router.get(`/get/featured/:count`, async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);

  if (!products) {
    res.status(500).json({ success: false });
  }
  res.send(products);
});

//put image

module.exports = router;
