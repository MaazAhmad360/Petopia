import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get threadId from URL
import { fetchThreadDetails } from "../services/api"; // Import the API function
import { replyToForumThread } from "../services/api";

const ThreadDetail = () => {
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyContent, setReplyContent] = useState(""); // State for reply content
  const [status, setStatus] = useState(""); // State for status messages

  const { threadId } = useParams(); // Get the threadId from the URL parameters

  useEffect(() => {
    const loadThreadDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchThreadDetails(threadId); // Call the API function
        setThread(data); // Set the fetched thread data
        setLoading(false);
      } catch (error) {
        setError(error.message); // Handle errors
        setLoading(false);
      }
    };

    loadThreadDetails(); // Call the function when the component mounts or threadId changes
  }, [threadId]); // Dependency array ensures it re-fetches if threadId changes

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (replyContent.trim() === "") {
      setStatus("Reply content cannot be empty.");
      return;
    }

    try {
      const replyData = { content: replyContent };
      await replyToForumThread(threadId, replyData); // Submit reply
      setReplyContent(""); // Clear the reply form
      setStatus("Reply added successfully!");
      // Refresh thread details to show the new reply
      const updatedThread = await fetchThreadDetails(threadId);
      setThread(updatedThread);
    } catch (error) {
      setStatus("Error adding reply: " + error.message);
    }
  };





  // Handle loading or error states
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
        <strong>Created at:</strong>{" "}
        {new Date(thread.creationDate).toLocaleString()}
      </p>

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
              <p>
                <strong>On:</strong> {new Date(reply.createdAt).toLocaleString()}
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
