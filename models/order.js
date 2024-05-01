const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  ProductName: String,
  image: String,
  Descreption: String,
  price: Number,
  Quantity: {
    type: Number,
    required: true,
  },
});

exports.Order = mongoose.model("Order", orderSchema);
