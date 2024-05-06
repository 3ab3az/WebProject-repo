const { Order }= require("../models/order");
const express = require("express");
const router = express.Router();
const OrderItem = require('../models/order-item');
const category = require("../models/category");

router.get(`/`, async (req, res) => {
  // try {
    const orderList = await Order.find().populate('user','name').sort();
    if(!orderList)
      {
        res.status(500).json({success: false})
      }
      res.send(orderList);
      // .populate("user", "name")
      // .populate({
      //   path: "orderItems",
      //   populate: {
      //     path: "product",
      //     populate: "category",
      //   },
      // });
    // res.json(orderList);
  // }
  //  catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }
});

router.get(`/:id`, async (req, res) => {
  // try {
    const order = await Order.findById(req.params.id).populate('user','name')
    // .populate('orderItems');  
      .populate({
        path: "orderItems",populate: {
          path: "product",populate: "categoryOfProduct"},
      });
    if (!order) {
      res.status(404).json({ success: false, message: "Order not found" });
    } else {
      res.json(order);
    }
  // } catch (error) {
  //   res.status(500).json({ success: false, error: error.message });
  // }
});

router.post("/", async (req, res) => {
  // try {
    const orderItemsIds = await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
          
        });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      })
    );  

const totalPrices = await Promise.all(
  orderItemsIds.map(async (orderItemId) => {
const orderItem = await OrderItem.findById(orderItemId).populate("product","price");
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      })
    );
    // console.log(totalPrice);

    let totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
      orderItems: orderItemsIds,
      shippingAddress: req.body.shippingAddress,
      city: req.body.city,
      country: req.body.country,
      phone: req.body.phone,
      status:req.body.status,
      user: req.body.user,
      dateOrdered:req.body.dateOrdered,
      promoCode: req.body.promoCode,
      totalPrice: totalPrice,
    });

    order = await order.save();
    res.send(order);
  
  //} catch (error) {
  //   res.status(400).json({
  //     success: false,
  //     message: "The order cannot be created!",
  //     error: error.message,
  //   });
  // }
});

router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status
    },
    { new: true }
  );

  if (!order) return res.status(400).send("the category cannot be created!");

  res.send(order);
});

router.delete("/:id", (req, res) => {
  Order.findByIdAndDelete(req.params.id)
  .then(async (order) => {
      if (order) {
        return res.status(200).json({ success: true, message: "The order is deleted!" });
      } else {
        return res.status(404).json({ success: false, message: "Order not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.get(`/get/count`, async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();

    if (!orderCount) {
      return res.status(500).json({ success: false });
    }

    res.send({
      orderCount: orderCount,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});



module.exports = router;
