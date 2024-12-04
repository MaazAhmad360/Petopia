import express from "express";
import {
  createForumThread,
  getforumThreads,
  
  addTags,
  searchForumThreads,
  replyToThread,
  getThreadDetails,
  getUserThreads
} from "../controllers/forumThreadController.js";


const router = express.Router();

// Create a new forum thread
router.post("/create", createForumThread);

// Get all forum threads
router.get("/", getforumThreads);

// Get forum threads by a specific user
router.get("/user-created", getUserThreads); 

router.patch("/:id/tags", addTags);

router.get("/search", searchForumThreads);
router.post("/:threadId/reply", replyToThread);
router.get("/:threadId", getThreadDetails);
export default router;
