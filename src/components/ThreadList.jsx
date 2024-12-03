import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchForumThreads, searchForumThreads } from "../services/api"; // Import API functions

const ThreadList = () => {
  const [threads, setThreads] = useState([]); // All threads or search results
  const [status, setStatus] = useState(""); // Status message
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch all threads on component mount
  useEffect(() => {
    const loadThreads = async () => {
      setLoading(true);
      try {
        const data = await fetchForumThreads(); // Fetch threads from the API
        setThreads(data); // Set threads to state
        setLoading(false);
      } catch (error) {
        setStatus("Error fetching threads: " + error.message); // Handle errors
        setLoading(false);
      }
    };

    loadThreads();
  }, []);

  // Handle thread click to navigate to the thread detail page
  const handleThreadClick = (threadId) => {
    navigate(`/thread/${threadId}`); // Navigate to thread details page
  };

  // Handle search functionality
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setStatus("Please enter a search query.");
      return;
    }

    setLoading(true);
    try {
      const results = await searchForumThreads(searchQuery); // Search threads
      setThreads(results); // Update threads with search results
      setStatus(""); // Clear status
      setLoading(false);
    } catch (error) {
      setStatus("Error searching threads: " + error.message); // Handle errors
      setLoading(false);
    }
  };

  // Handle creating a new thread
  const handleCreateThread = () => {
    navigate("/create-thread"); // Navigate to the thread creation page
  };

  return (
    <div className="container">
      <h1>Forum Threads</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search threads by title, content, or tags..."
        />
        <button type="submit">Search</button>
      </form>

      {/* Create New Thread Button */}
      <button onClick={handleCreateThread} className="create-thread-button">
        Create New Thread
      </button>

      {/* Display status or loading message */}
      {status && <p>{status}</p>}
      {loading ? (
        <p>Loading threads...</p>
      ) : threads.length === 0 ? (
        <p>No threads found.</p>
      ) : (
        <ul>
          {threads.map((thread) => (
            <li key={thread._id}>
              <button
                className="thread-button"
                onClick={() => handleThreadClick(thread._id)}
              >
                {thread.title}
              </button>
              <p>
                by <strong>{thread.author.name}</strong> on{" "}
                {new Date(thread.creationDate).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThreadList;
