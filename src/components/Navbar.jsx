import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../services/api";
import "../styles/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState({ firstname: "", imageUrl: "" });
  const navigate = useNavigate();

  // Function to navigate to the profile page
  const handleProfileClick = () => {
    navigate("/profile-page"); // Navigate to the profile page
  };

  // Fetch user details on component mount
  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const data = await fetchUserDetails();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    loadUserDetails();
  }, []);

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><a href="/events">Events</a></li>
          <li><a href="/adoption">Pet Adoption</a></li>
          <li><a href="/equipment">Pet Equipment</a></li>
          <li><a href="/veterinary">Veterinary Services</a></li>
          <li><a href="/forum">Forum</a></li>
        </ul>
      </nav>

      <div className="user-profile" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
        {/*<img src={user.imageUrl || "/default-avatar.png"} alt="User Avatar" className="profile-avatar" />*/}
        <p>{user.firstname || "Anonymous"}</p>
      </div>
    </aside>
  );
};

export default Navbar;
