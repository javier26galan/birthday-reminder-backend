const mongoose = require("mongoose");

const GoogleUserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  username: { type: String, required: true },
  image: { type: String },
  bdaylist: [{ type: mongoose.Schema.Types.ObjectId, ref: "BdayItem" }],
});

const GoogleUser = mongoose.model("GoogleUser", GoogleUserSchema);

module.exports = GoogleUser;
