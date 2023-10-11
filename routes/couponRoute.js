const express = require("express");
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getCoupon,
} = require("../controller/couponCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.get("/:id", authMiddleware, isAdmin, getCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupons);

module.exports = router;
