import React, { useState, useEffect } from "react";
import axios from "axios";

const AddTagsForm = () => {
  const [threadId, setThreadId] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("");
  const [threads, setThreads] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // Fetch threads and check if the user is the author of any thread
    const fetchThreads = async () => {
      try {
        const response = await axios.get("/api/forumsThreads", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Using token to identify the user
          },
        });
        setThreads(response.data);

        // Check if the selected thread belongs to the logged-in user
        const selectedThread = response.data.find((thread) => thread._id === threadId);
        if (selectedThread) {
          setIsOwner(selectedThread.isOwner); // Set isOwner based on the user's ownership
        }
      } catch (error) {
        setStatus("Error fetching threads: " + error.message);
      }
    };

    fetchThreads();
  }, [threadId]); // Re-run when threadId changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOwner) {
      setStatus("You cannot add tags to this thread.");
      return;
    }

    const newTags = tags.split(",").map((tag) => tag.trim());

    try {
      const response = await axios.put(`/api/forumsThreads/addTags/${threadId}`, {
        tags: newTags,
      });
      setStatus(response.data.message || "Tags added successfully!");
    } catch (error) {
      setStatus(
        "Error adding tags: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="container">
      <h1>Add Tags to Thread</h1>
      <form onSubmit={handleSubmit}>
        <label>Thread ID:</label>
        <select
          value={threadId}
          onChange={(e) => setThreadId(e.target.value)}
          required
        >
          <option value="">Select a Thread</option>
          {threads.map((thread) => (
            <option key={thread._id} value={thread._id}>
              {thread.title}
            </option>
          ))}
        </select>

        <label>Tags (comma separated):</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />

        <button type="submit" disabled={!isOwner}>
          {isOwner ? "Add Tags" : "You cannot add tags to this thread"}
        </button>
      </form>
      <div>{status}</div>
    </div>
  );
};

export default AddTagsForm;
