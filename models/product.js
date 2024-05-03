const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  moreImages: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  Quantity: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  categoryOfProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  rating: {
    type: Number,
    default: "0",
  },
  Reviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

exports.Product = mongoose.model("Product", productSchema);
