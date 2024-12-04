import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get threadId from URL
import { fetchThreadDetails, addTagsToThread, replyToForumThread } from "../services/api"; // Import the API function
import "../styles/ThreadDetail.css";

const ThreadDetail = () => {
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [tagInput, setTagInput] = useState(""); // State for new tags
  const [status, setStatus] = useState("");

  const { threadId } = useParams();

  useEffect(() => {
    const loadThreadDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchThreadDetails(threadId);
        setThread(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    loadThreadDetails();
  }, [threadId]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (replyContent.trim() === "") {
      setStatus("Reply content cannot be empty.");
      return;
    }

    try {
      const replyData = { content: replyContent };
      await replyToForumThread(threadId, replyData);
      setReplyContent("");
      setStatus("Reply added successfully!");

      // Refresh thread details
      const updatedThread = await fetchThreadDetails(threadId);
      setThread(updatedThread);
    } catch (error) {
      setStatus("Error adding reply: " + error.message);
    }
  };

  const handleAddTags = async (e) => {
    e.preventDefault();
    if (tagInput.trim() === "") {
      setStatus("Tags cannot be empty.");
      return;
    }

    try {
      const newTags = tagInput.split(",").map((tag) => tag.trim()); // Convert comma-separated tags to array
      const updatedThread = await addTagsToThread(threadId, newTags); // Call API
      setThread(updatedThread); // Update thread state with new data
      setTagInput(""); // Clear input field
      setStatus("Tags added successfully!");
    } catch (error) {
      setStatus("Error adding tags: " + error.message);
    }
  };

  if (loading) return <p>Loading thread...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="thread-detail-container">
      <h1>{thread.title}</h1>
      <p>{thread.content}</p>
      <p>
        <strong>By:</strong> {thread.author?.name || "Unknown Author"}
      </p>
      <p>
        <strong>Created at:</strong> {new Date(thread.creationDate).toLocaleString()}
      </p>

      {/* Display Tags */}
      <h3>Tags:</h3>
      {thread.tags.length === 0 ? (
        <p>No tags added yet.</p>
      ) : (
        <ul>
          {thread.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      )}

      {/* Add Tags (Visible only to the thread owner) */}
      
      <div className="add-tags-form">
        <h3>Add Tags</h3>
        <form onSubmit={handleAddTags}>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Enter tags, separated by commas"
            required
          />
          <button type="submit">Add Tags</button>
        </form>
      </div>
    

      {/* Replies Section */}
      <h3>Replies:</h3>
      {thread.replies.length === 0 ? (
        <p>No replies yet. Be the first to reply!</p>
      ) : (
        <ul>
          {thread.replies.map((reply) => (
            <li key={reply._id}>
              <p>{reply.content}</p>
              <p>
                <strong>By:</strong> {reply.user?.name || "Anonymous"}
              </p>
              
            </li>
          ))}
        </ul>
      )}

      {/* Reply Form */}
      <div className="reply-form-container">
        <h3>Add a Reply</h3>
        <form onSubmit={handleReplySubmit}>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply here..."
            rows="4"
            required
          ></textarea>
          <button type="submit">Post Reply</button>
        </form>
        {status && <p>{status}</p>}
      </div>
    </div>
  );
};

export default ThreadDetail;
