import ForumThread from "../models/forumsThreads.js";

// Create a new forum thread
export const createForumThread = async (req, res) => {
  try {
    const threadData = req.body;
    const newThread = new ForumThread(threadData);
    await newThread.save();
    res
      .status(201)
      .json({
        message: "Forum thread created successfully!",
        thread: newThread,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all forum threads
export const getAllForumThreads = async (req, res) => {
  try {
    const threads = await ForumThread.find().populate("author");
    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
