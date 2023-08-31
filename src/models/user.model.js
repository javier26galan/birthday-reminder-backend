const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String },
  bdaylist: [{ type: mongoose.Schema.Types.ObjectId, ref: "BdayItem" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
