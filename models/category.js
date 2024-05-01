const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  ProductName: String,
  image: String,
  Descreption: String,
  price: Number,
  Quantity: {
    type: Number,
    required: true,
  },
});

exports.Category = mongoose.model("Category", categorySchema);
