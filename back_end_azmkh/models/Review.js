const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true },
  user: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
