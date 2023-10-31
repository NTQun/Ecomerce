const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var addressShema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Address", addressShema);
