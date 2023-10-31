const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var wareHoueSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    price: {
      type: Number,
      default: 0,
      // required: true,
    },
    importprice: {
      type: Number,
      default: 0,
      // required: true,
    },

    quantity: {
      type: Number,
      default: 0,
      // required: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Warehoue", wareHoueSchema);
