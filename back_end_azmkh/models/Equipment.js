const mongoose = require("mongoose");

const equipmentSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  image: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Equipment", equipmentSchema);
