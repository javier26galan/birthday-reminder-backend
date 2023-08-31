const mongoose = require("mongoose");

const connectDB = async (url) => {
  url.toString();
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database! \u{1F44D}");
  } catch (error) {
    console.log("Connection with database failed. \u{1F972}");
  }
};

module.exports = connectDB;
