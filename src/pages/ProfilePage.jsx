import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../AxioInstance";
import "../styles/ProfilePage.css";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState(null); // User details state
    const [activeTab, setActiveTab] = useState("threads"); // Default active tab
    const [data, setData] = useState([]); // Data for the active tab
    const navigate = useNavigate();

    // Fetch user details on component mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get("/api/user/details");
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    // Fetch data for the active tab
    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpointMap = {
                    threads: "/api/forumsThreads/user-created",
                    // Add other endpoints for tabs here if necessary
                };
                if (endpointMap[activeTab]) {
                    const response = await axios.get(endpointMap[activeTab]);
                    setData(response.data);
                }
            } catch (error) {
                console.error(`Error fetching data for ${activeTab}:`, error);
            }
        };

        if (activeTab) fetchData();
    }, [activeTab]);

    // Navigate to thread details
    const handleThreadClick = (threadId) => {
        navigate(`/thread/${threadId}`);
    };

    if (!userDetails) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="profile-page">
            {/* Sidebar for navigation */}
            <Navbar />
            {/* Profile Header */}
            <div className="profile-header">
                <img
                    src={userDetails.imageUrl || "/default-avatar.png"}
                    alt="Profile Avatar"
                    className="profile-avatar"
                />
                <h1>{`${userDetails.firstname} ${userDetails.lastname}`}</h1>
                <p>Email: {userDetails.user.email}</p>
                <p>Gender: {userDetails.gender}</p>
                <p>Favorite Pet: {userDetails.favoritePet || "Not specified"}</p>
            </div>

            {/* Tabs */}
            <div className="profile-tabs">
                <button
                    className={activeTab === "threads" ? "active" : ""}
                    onClick={() => setActiveTab("threads")}
                >
                    Forum Threads
                </button>
                {/* Add other tabs as needed */}
            </div>

            {/* Content Section */}
            <div className="profile-content">
                {activeTab === "threads" && (
                    <ul className="thread-list">
                        {data.length === 0 ? (
                            <p>No threads found.</p>
                        ) : (
                            data.map((thread) => (
                                <li
                                    key={thread._id}
                                    className="thread-item"
                                    onClick={() => handleThreadClick(thread._id)}
                                >
                                    <h3>{thread.title}</h3>
                                    <p>
                                        <strong>Tags:</strong> {thread.tags.join(", ")}
                                    </p>
                                    <p>
                                        <strong>Replies:</strong> {thread.replies.length}
                                    </p>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
