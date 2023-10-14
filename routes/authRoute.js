const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  createOrder,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrders,
  getMonthWiseOrderIncome,
  getAllOrders,
  getYearlyTotalOrders,
  getSingleOrders,
  getallUser,
  emptyCart,
  updateOrder,
  loginDelivery,
} = require("../controller/userCtrl");
const {
  authMiddleware,
  isAdmin,
  isDelivery,
} = require("../middlewares/authMiddleware");
const { checkout, paymentVerrification } = require("../controller/paymentCtrl");

const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);
router.put("/updateOrder/:id", authMiddleware, isAdmin, updateOrder);
router.put(
  "/delivery-updateOrder/:id",
  authMiddleware,
  isDelivery,
  updateOrder
);

router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.delete("/empty", authMiddleware, emptyCart);

router.post("/admin-login", loginAdmin);
router.post("/delivery-login", loginDelivery);

router.post("/cart", authMiddleware, userCart);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerrification);
router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/all-users", getallUser);
router.get("/getOrder/:id", authMiddleware, isAdmin, getSingleOrders);
router.get(
  "/delivery-getOrder/:id",
  authMiddleware,
  isDelivery,
  getSingleOrders
);
router.get("/delivery-getallorders", authMiddleware, isDelivery, getAllOrders);

router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/getmyorders", authMiddleware, getMyOrders);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);
router.get("/getYearlyTotalOrders", authMiddleware, getYearlyTotalOrders);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);
router.delete("/:id", deleteaUser);

router.delete(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductQuantityFromCart
);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);

router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
