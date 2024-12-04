import React, { useState } from "react";
import axios from "axios";
import { replyToForumThread } from "../services/api"; // Import the API function
import Navbar from "./Navbar";

const ReplyForm = ({ threadId, onReplyAdded }) => {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/forumsThreads/${threadId}/reply`, {
        content,
      });

      setStatus("Reply added successfully!");
      setContent(""); // Clear the input
      onReplyAdded(); // Notify parent component to refresh the replies
    } catch (error) {
      setStatus("Error adding reply: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      {/* Sidebar for navigation */}
      <Navbar />
      <h2>Reply to this thread</h2>
      <form onSubmit={handleReplySubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your reply..."
          required
        />
        <button type="submit">Submit Reply</button>
      </form>
      <div>{status}</div>
    </div>
  );
};

export default ReplyForm;
