import React, { useState, useEffect } from "react";
import axios from "../AxioInstance";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState(null); // User details state
    const [activeTab, setActiveTab] = useState("adoptions"); // Active tab state
    const [data, setData] = useState([]); // Data for the active tab

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
                    adoptions: "/api/adoption/booked",
                    appointments: "/api/vet/appointments",
                    events: "/api/event/user-going",
                    threads: "/api/forumsThreads/user-created",
                };
                const response = await axios.get(endpointMap[activeTab]);
                setData(response.data);
            } catch (error) {
                console.error(`Error fetching data for ${activeTab}:`, error);
            }
        };

        if (activeTab) fetchData();
    }, [activeTab]);

    if (!userDetails) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="profile-page">
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
                    className={activeTab === "adoptions" ? "active" : ""}
                    onClick={() => setActiveTab("adoptions")}
                >
                    Pet Adoptions
                </button>
                <button
                    className={activeTab === "appointments" ? "active" : ""}
                    onClick={() => setActiveTab("appointments")}
                >
                    Vet Appointments
                </button>
                <button
                    className={activeTab === "events" ? "active" : ""}
                    onClick={() => setActiveTab("events")}
                >
                    Events
                </button>
                <button
                    className={activeTab === "threads" ? "active" : ""}
                    onClick={() => setActiveTab("threads")}
                >
                    Forum Threads
                </button>
            </div>

            {/* Content Section */}
            <div className="profile-content">
                {data.length === 0 ? (
                    <p>No data available for this section.</p>
                ) : (
                    <ul>
                        {data.map((item, index) => (
                            <li key={index}>{item.title || item.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
