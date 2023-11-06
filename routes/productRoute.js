const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  createWareProduct,
  getWarehouse,
  importWarehouse,
  getAWarehouse,
  deleteProductWarehouse,
  updateQuantityOrder,
  updateQuantityCancel,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/warehouse", getWarehouse);
router.get("/warehouse/:id", getAWarehouse);

router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);

router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

router.get("/", getAllProduct);
// router.put("/update-warehouse/:id", updateWarehouse);
router.post("/import-warehouse/:id", authMiddleware, importWarehouse);
router.post("/warehouse/:id", authMiddleware, createWareProduct);

router.post("/update-quantity-order/:id", updateQuantityOrder);
router.post("/update-quantity-cancel/:id", updateQuantityCancel);

router.delete("/warehouse/:id", deleteProductWarehouse);

module.exports = router;
