import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchForumThreads, searchForumThreads } from "../services/api";
import "../styles/ThreadList.css"; 
import Navbar from "./Navbar";

const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all threads on component mount
  useEffect(() => {
    const loadThreads = async () => {
      setLoading(true);
      try {
        const data = await fetchForumThreads();
        setThreads(data);
        setLoading(false);
      } catch (error) {
        setStatus("Error fetching threads: " + error.message);
        setLoading(false);
      }
    };

    loadThreads();
  }, []);

  // Handle thread click
  const handleThreadClick = (threadId) => {
    navigate(`/thread/${threadId}`);
  };

  // Handle search functionality
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page refresh

    if (!searchQuery.trim()) {
      setStatus("Please enter a search query.");
      return;
    }

    setLoading(true);
    try {
      const results = await searchForumThreads(searchQuery);
      setThreads(results);
      setStatus(results.length > 0 ? "" : "No threads found.");
      setLoading(false);
    } catch (error) {
      setStatus("Error searching threads: " + error.message);
      setLoading(false);
    }
  };

  // Handle navigating to create thread page
  const handleCreateThread = () => {
    navigate("/create-thread");
  };

  return (
    <div className="container">
      {/* Sidebar for navigation */}
      <Navbar />
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
                by <strong>{thread.author?.name || "Unknown"}</strong> on{" "}
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
