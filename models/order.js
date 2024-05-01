const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem',
    required:true
}],
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
  type: String,
  required: true,
},
totalPrice: {
  type: Number,
},
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
},
promoCode: {
  type: Number,
  default:"",
}
});
orderSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
exports.Order = mongoose.model("Order", orderSchema);
