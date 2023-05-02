const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: "rzp_test_3iJMbjmvX1IVGL",
  key_secret: "AW2j6xJPrLBPoN5FXB5NkF7l",
});
const checkout = async (req, res) => {
  const { amount } = req.body;
  const option = {
    amount: amount * 100,
    currency: "USD",
  };
  const order = await instance.orders.create(option);
  res.json({
    success: true,
    order,
  });
};
const paymentVerrification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  res.json({
    razorpayOrderId,
    razorpayPaymentId,
  });
};
module.exports = {
  checkout,
  paymentVerrification,
};

// const Paypalpay = require("paypalpay");
// const instance = new Razorpay({
//   key_id: "rzp_test_3iJMbjmvX1IVGL",
//   key_secret: "AW2j6xJPrLBPoN5FXB5NkF7l",
// });
// const checkout = async (req, res) => {
//   const option = {
//     amount: 10000,
//     currency: "USD",
//   };
//   const order = await instance.orders.create(option);
//   res.json({
//     success: true,
//     order,
//   });
// };
// const paymentVerrification = async (req, res) => {
//   const { razorpayOrderId, razorpayPaymentOrderId } = req.body;
//   res.json({
//     razorpayOrderId,
//     razorpayPaymentOrderId,
//   });
// };
// module.exports = {
//   checkout,
//   paymentVerrification,
// };
