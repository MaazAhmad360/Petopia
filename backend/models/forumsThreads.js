// models/ForumThread.js
import mongoose from "mongoose";


const forumThreadSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    tags: { type: [String], required: true },
    replies: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("forumsThreads", forumThreadSchema);
