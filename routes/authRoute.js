const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getAllUser,
  getAUser,
} = require("../controller/userCtrl");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getAllUser);
router.get("/:id", getAUser);

module.exports = router;
