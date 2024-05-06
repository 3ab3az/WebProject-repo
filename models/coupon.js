const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
    name: {
    type: String,
    unique: true,
    uppercase: true,
    },
    expiry: {
    type: Date,
    },
    discount: {
    type: Number,
    }
})

module.exports = mongoose.model("PromoCode", couponSchema);