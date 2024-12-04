import React, { useEffect, useState } from "react";
import { fetchUserDetails } from "../services/api";
import "../styles/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState({ firstname: "", imageUrl: "" });

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
          <li><a href="/petmate">Pet Mate</a></li>
          <li><a href="/equipment">Pet Equipment</a></li>
          <li><a href="/veterinary">Veterinary Services</a></li>
          <li><a href="/forum">Forum</a></li>
        </ul>
      </nav>

      <div className="user-profile">
        <img src={user.imageUrl || "/default-avatar.png"} alt="User Avatar" />
        <p>{user.firstname || "Anonymous"}</p>
      </div>
    </aside>
  );
};

export default Navbar;
