// models/HealthRecord.js
import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    description: String,
    attachments: [String],
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("HealthRecord", healthRecordSchema);
