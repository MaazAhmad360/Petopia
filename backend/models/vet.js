import mongoose from "mongoose";

const vetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
  contact: { type: String, required: true },
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, required: true },
      comment: { type: String },
    },
  ],
  averageRating: { type: Number, default: 0 },
  appointments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      date: { type: String, required: true },
      time: { type: String, required: true },
    },
  ],
});

export default mongoose.model("Veterinarian", vetSchema);
