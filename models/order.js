const mongoose = require("mongoose");
const OrderItem = require('../models/order-item');
const orderSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem',
      required: true,
    },
  ],
  shippingAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
  promoCode: {
    type:  String,
    default: null,
  },
  totalPrice: {
    type: Number,
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon',
  },
  PriceAfterDiscount: {
    type: Number,
  },
});

exports.Order = mongoose.model("Order", orderSchema);
