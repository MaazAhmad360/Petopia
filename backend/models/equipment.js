// models/Equipment.js
import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    brand: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

export default mongoose.model("Equipment", equipmentSchema);
