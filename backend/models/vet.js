// models/Veterinarian.js
import mongoose from "mongoose";

const veterinarianSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: String,
    experience: Number,
    appointments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Veterinarian", veterinarianSchema);
