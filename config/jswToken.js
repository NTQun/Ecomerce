const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SERCRET, { expiresIn: "3d" });
};
module.exports = { generateToken };
