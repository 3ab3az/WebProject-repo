const { Order }= require("../models/order");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          populate: "category",
        },
      });
    res.json(orderList);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          populate: "category",
        },
      });
    if (!order) {
      res.status(404).json({ success: false, message: "Order not found" });
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    // const orderItemsIds = await Promise.all(
    //   req.body.orderItems.map(async (orderItem) => {
    //     let newOrderItem = new OrderItem({
    //       quantity: orderItem.quantity,
    //       product: orderItem.product,
    //     });
    //     newOrderItem = await newOrderItem.save();
    //     return newOrderItem._id;
    //   })
    // );

    // const totalPrices = await Promise.all(
    //   orderItemsIds.map(async (orderItemId) => {
    //     const orderItem = await OrderItem.findById(orderItemId).populate(
    //       "product",
    //       "price"
    //     );
    //     const totalPrice = orderItem.product.price * orderItem.quantity;
    //     return totalPrice;
    //   })
    // );

    // let totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
      //orderItems: orderItemsIds,
      shippingAddress: req.body.shippingAddress,
      city: req.body.city,
      country: req.body.country,
      phone: req.body.phone,
      totalPrice: totalPrice,
      user: req.body.user,
      //promoCode: req.body.promoCode,
    });

    order = await order.save();
    res.send(order);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "The order cannot be created!",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.id);
    if (order) {
      await Promise.all(
        order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndRemove(orderItem);
        })
      );
      res.status(200).json({ success: true, message: "The order is deleted!" });
    } else {
      res.status(404).json({ success: false, message: "Order not found!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
