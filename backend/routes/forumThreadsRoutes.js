import express from "express";
import {
  createForumThread,
  getforumThreads,
  addTagsToThread,
  addTags,
  searchForumThreads,
  replyToThread,
  getThreadDetails,
} from "../controllers/forumThreadController.js";


const router = express.Router();

// Create a new forum thread
router.post("/create", createForumThread);

// Get all forum threads
router.get("/", getforumThreads);

router.patch("/:id/tags", addTagsToThread);
router.patch("/:id/tags", addTags);

router.get("/search", searchForumThreads);
router.post("/:threadId/reply", replyToThread);
router.get("/:threadId", getThreadDetails);
export default router;
