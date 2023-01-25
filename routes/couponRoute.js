const express = require("express");
const { createCoupon } = require("../controller/couponCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
// router.put("/:id", authMiddleware, isAdmin, updateBrand);
// router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
// router.get("/:id", getBrand);
// router.get("/", getallBrand);

module.exports = router;
