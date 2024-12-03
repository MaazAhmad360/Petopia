// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
    forumThreads: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ForumThread" },
    ],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    aiRecommendations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "AIRecommendation" },
    ],
  },
  { timestamps: true }
);
const user = mongoose.model("user", userSchema);

export default mongoose.model("user", userSchema);
