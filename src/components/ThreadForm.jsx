import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { createForumThread } from "../services/api"; // Import the API function
import "../styles/forums.css"; 


const ThreadForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate(); // For navigation after thread creation

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newThread = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()), // Convert tags into an array
    };

    try {
      const createdThread = await createForumThread(newThread); // Use API function
      setStatus("Thread created successfully!");
      navigate("/"); // Redirect to the thread list page
    } catch (error) {
      setStatus(
        "Error creating thread: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="container">
      <h1>Create Forum Thread</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          required
        />

        <label>Tags (comma separated):</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button type="submit">Create Thread</button>
      </form>
      {status && <div>{status}</div>}
    </div>
  );
};

export default ThreadForm;
