const Order = require("../models/product");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const orderList = await Orders.find();

  if (!productList) {
    res.status(500).json({
      success: false,
    });
  }
  res.json(productList);
});

router.get(`/:id`, async (req, res) =>{
  const order = await Orders.findById(req.params.id)
  .populate('user', 'name')
  .populate({ 
      path: 'orderItems', populate: {
          path : 'product', populate: 'category'} 
      });

  if(!order) {
      res.status(500).json({success: false})
  } 
  res.send(orderList);
})

router.post(`/`, (req, res) => {
  const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
    let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product
    })

    newOrderItem = await newOrderItem.save();

    return newOrderItem._id;
}))
const orderItemsIdsResolved =  await orderItemsIds;

const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
    const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
    const totalPrice = orderItem.product.price * orderItem.quantity;
    return totalPrice
}))
  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress: req.body.shippingAddress,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,
    totalPrice: totalPrice,
    user: req.body.user,
    promoCode:req.body.promoCode,
})
order = await order.save();
if(!order)
return res.status(400).send('the order cannot be created!')

res.send(order);
});



router.delete('/:id', (req, res)=>{
  Order.findByIdAndRemove(req.params.id).then(async order =>{
      if(order) {
          await order.orderItems.map(async orderItem => {
              await OrderItem.findByIdAndRemove(orderItem)
          })
          return res.status(200).json({success: true, message: 'the order is deleted!'})
      } else {
          return res.status(404).json({success: false , message: "order not found!"})
      }
  }).catch(err=>{
  return res.status(500).json({success: false, error: err}) 
  })
})
module.exports = router;
