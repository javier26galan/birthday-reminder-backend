const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  profilename: { type: String },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  image: { type: String },
  bdaylist: [{ type: mongoose.Schema.Types.ObjectId, ref: "BdayItem" }],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
