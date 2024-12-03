import express from 'express';
import { createForumThread, getAllForumThreads } from '../controllers/forumThreadController.js';

const router = express.Router();

// Create a new forum thread
router.post('/', createForumThread);

// Get all forum threads
router.get('/', getAllForumThreads);

export default router;
