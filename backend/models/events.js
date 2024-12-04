// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: Date,
    location: String,
    type: String,
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);
const Event = mongoose.model("Event", eventSchema);

export default mongoose.model("Event", eventSchema);
