// models/Appointment.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    time: String,
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    veterinarian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinarian",
      required: true,
    },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
