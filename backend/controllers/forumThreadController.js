import forumsThreads from "../models/forumsThreads.js";
import user from "../models/user.js"; // Correct model import
// utils/auth.js
import {
 getUserId
} from "../utils/auth.js";
// Create a new forum thread
export const createForumThread = async (req, res) => {
  try {
    const { title, content, tags, username } = req.body;

    // Find the user by username (case-insensitive search)
    const author = await user.findOne({
      name: { $regex: new RegExp(username, "i") },
    });

    if (!author) {
      return res.status(404).json({ error: "User not found" });
    }

    // If no tags are provided, set an empty array
    const threadTags = tags || [];

    // Create a new forum thread with the user's ObjectId as the author
    const newThread = new forumsThreads({
      title,
      content,
      author: author._id, // Set the user's ObjectId as the author
      tags: threadTags,
    });

    // Save the new thread
    await newThread.save();

    // Send a success response
    res.status(201).json({
      message: "Forum thread created successfully!",
      thread: newThread,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all forum threads
export const getforumThreads = async (req, res) => {
  try {
    // Fetch threads and populate author details
    const threads = await forumsThreads.find().populate("author", "name email"); // Populate only required fields

    const threadsWithOwnership = threads.map((thread) => ({
      ...thread.toObject(),
      isOwner: thread.author._id.toString() === user, // Check ownership
    }));

    if (threads.length === 0) {
      return res.status(404).json({ message: "No forum threads found" });
    }

    res.status(200).json(threads);
  } catch (error) {
    console.error("Error fetching forum threads:", error);
    res.status(500).json({ error: error.message });
  }
};

// Controller to add tags to a thread
// export const addTagsToThread = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { tags } = req.body;

//     // Find the thread and add tags
//     const updatedThread = await forumsThreads.findByIdAndUpdate(
//       id,
//       { $addToSet: { tags: { $each: tags } } }, // Prevent duplicate tags
//       { new: true }
//     );

//     if (!updatedThread) {
//       return res.status(404).json({ message: "Thread not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Tags added successfully", thread: updatedThread });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error adding tags", error: error.message });
//   }
// };

export const searchForumThreads = async (req, res) => {
  try {
    const { keyword, tags } = req.query;

    const searchCriteria = {};

    // If a keyword is provided, search in title and content
    if (keyword) {
      searchCriteria.$or = [
        { title: { $regex: keyword, $options: "i" } }, // Case-insensitive search in title
        { content: { $regex: keyword, $options: "i" } }, // Case-insensitive search in content
      ];
    }

    // If tags are provided, match any of the tags
    if (tags) {
      searchCriteria.tags = { $in: tags.split(",") }; // Split tags if comma-separated
    }

    // Query the database
    const threads = await forumsThreads
      .find(searchCriteria)
      .populate("author", "name email");

    if (threads.length === 0) {
      return res.status(404).json({
        message: "No matching threads found.",
        suggestions: [
          "Try searching with different keywords.",
          "Browse popular threads in the forum.",
        ],
      });
    }

    res.status(200).json(threads);
  } catch (error) {
    console.error("Error searching forum threads:", error.message);
    res.status(500).json({ error: "Error processing search request" });
  }
};

export const addTags = async (req, res) => {
  try {
    const { id } = req.params; // Thread ID
    const { tags } = req.body; // Tags to add
    const userId = getUserId(req); // User ID from middleware

    

    if (!userId) {
      return res
        .status(403)
        .json({
          message: "You are not authorized to add tags to this thread.",
        });
    }

    // Add tags to the thread
    const updatedThread = await forumsThreads.findByIdAndUpdate(
      id,
      { $addToSet: { tags: { $each: tags } } }, // Prevent duplicate tags
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Tags added successfully", thread: updatedThread });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding tags", error: error.message });
  }
};

export const replyToThread = async (req, res) => {
  try {
    const { threadId } = req.params; // Thread ID from the URL
    const { content } = req.body; // Extract username and content from the request body

    // Validate the content length
    if (content.length < 1) {
      return res
        .status(400)
        .json({ message: "Reply is too short. Please provide more content." });
    }

    // Find the user by username
    const userId=getUserId(req);
    if (!userId) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the thread by ID
    const thread = await forumsThreads.findById(threadId);

    if (!thread) {
      return res.status(404).json({ message: "Thread not found." });
    }

    // Add the reply to the thread
    thread.replies.push({
      user: userId, // Use the user's ObjectId
      content,
    });
    await thread.save();

    res.status(200).json({ message: "Reply added successfully", thread });
  } catch (error) {
    console.error("Error adding reply:", error);
    res
      .status(500)
      .json({ message: "Error adding reply", error: error.message });
  }
};

export const getThreadDetails = async (req, res) => {
  try {
    const { threadId } = req.params; // Get threadId from URL parameters

    // Find the thread by ID and populate the author and replies.user fields
    const thread = await forumsThreads
      .findById(threadId)
      .populate("author", "name email") // Populate author details (e.g., name and email)
      .populate("replies.user", "name email"); // Populate user details in replies

    if (!thread) {
      return res.status(404).json({ message: "Thread not found." });
    }

    res.status(200).json(thread);
  } catch (error) {
    console.error("Error fetching thread details:", error);
    res
      .status(500)
      .json({
        message: "Error fetching thread details.",
        error: error.message,
      });
  }
};

// Controller to get threads created by the logged-in user
export const getUserThreads = async (req, res) => {
  const userId = getUserId(req); // Extract user ID from the token

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: Invalid or missing token" });
  }

  try {
    const userThreads = await forumsThreads.find({ author: userId }).populate("author", "username email");
    res.status(200).json(userThreads);
  } catch (error) {
    console.error("Error fetching user threads:", error);
    res.status(500).json({ error: "Failed to fetch user threads" });
  }
};
