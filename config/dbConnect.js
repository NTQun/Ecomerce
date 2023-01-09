const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    });

    console.log("Database connect successfully");
  } catch (error) {
    console.log("Database error");
  }
};

module.exports = dbConnect;
