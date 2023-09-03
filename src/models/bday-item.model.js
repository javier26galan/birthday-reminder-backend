const mongoose = require("mongoose");

const bdayItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthday: { type: Date, required: true},
  likes: [{ type: String}]
});

const BdayItem = mongoose.model("BdayItem", bdayItemSchema);

module.exports = BdayItem;
