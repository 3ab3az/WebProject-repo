const  Coupon  = require("../models/coupon");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
try {
    const couponList = await Coupon.find();
    res.status(200).send(couponList);
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
}
});

router.get("/:id", async (req, res) => {
try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
    return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).send(coupon);
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
}
});
router.post("/", async (req, res) => {
try {
    const coupon = new Coupon({
    name: req.body.name,
    expiry: req.body.expiry,
    discount: req.body.discount,
    });
    const savedCoupon = await coupon.save();
    res.status(201).send(savedCoupon);
} catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
}
});

module.exports = router;
