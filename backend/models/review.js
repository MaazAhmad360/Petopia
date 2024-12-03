// models/Review.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    date: { type: Date, default: Date.now },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    equipment: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
