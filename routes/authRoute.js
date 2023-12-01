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
  getAddress,
  updateAddress,
  deleteAdd,
  getoneAdress,
  findUser,
  updateAccount,
  commentOrder,
  updateCommentOrder,
  deleteCommentOrder,
  addShipperforOrder,
  updateRoleUser,
  getOrderByShipper,
  deleteShipperforOrder,
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
router.put("/cancel/:id", authMiddleware, updateOrder);

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

router.post("/cart", authMiddleware, userCart);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerrification);
router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/all-users", getallUser);
router.get("/getOrder/:id", authMiddleware, isAdmin, getSingleOrders);
router.get("/delivery-getOrder/:id", getSingleOrders);
router.get("/delivery-getallorders", authMiddleware, isDelivery, getAllOrders);
router.put(
  "/delete-order-shipper/:id",

  deleteShipperforOrder
);

router.get("/address", authMiddleware, getAddress);
router.get("/address/:id", authMiddleware, getoneAdress);
router.get("/", authMiddleware, findUser);

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
router.delete("/:id", authMiddleware, isAdmin, deleteaUser);

router.delete(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductQuantityFromCart
);
router.delete("/delete-address/:id", authMiddleware, deleteAdd);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/edit-user/:id", authMiddleware, updateAccount);

router.put("/update-address/:id", authMiddleware, updateAddress);

router.post("/save-address", authMiddleware, saveAddress);
router.put("/comment-order/:id", commentOrder);
router.put("/comment-update/:id", updateCommentOrder);
router.put("/comment-delete/:id", deleteCommentOrder);
router.get("/single-order/:id", getSingleOrders);
router.post("/order-by-shippper/:id", getOrderByShipper);

router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

router.put("/add-shipper/:id", addShipperforOrder);
router.put("/update-role/:id", authMiddleware, updateRoleUser);

module.exports = router;
