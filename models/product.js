const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  ProductName: String,
  image: String,
  Descreption: String,
  price: Number,
  Quantity: {
    type: Number,
    required: true,
  },
});

exports.Product = mongoose.model("Product", productSchema);
