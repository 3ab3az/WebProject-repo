const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  descreption: {
    type: String,
    required: true,
  },
  longDescreption: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  moreImages: {
    type: String,
    defult: "",
  },
  price: {
    type: Number,
    defult: 0,
  },
  Quantity: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  categoryOfProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  ratingOfproduct: {
    type: Number,
    default: "0",
  },
  numOfReviews: {
    type: Number,
    defult: 0,
  },
  isFeatured: {
    type: Boolean,
    defult: false,
  },
  dateCreatedOfProduct: {
    type: Date,
    defult: Date.now,
  },
});

exports.Product = mongoose.model("Product", productSchema);
