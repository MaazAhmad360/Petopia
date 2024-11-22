import React from "react";
import "../styles/HomePage.css";
import petImage from "../assets/pet.jpg";


const HomePage = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <h1>Petopia</h1>
      </header>

      {/* Sidebar for navigation */}
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
      </aside>

      {/* Main content */}
      <main className="main-content">
        <div className="home-card">
          <div className="tagline">
            <h2>Your All-in-One Pet Manager</h2>
            <p>From events to adoptions, and even finding a mate for your pet – Petopia is here to help!</p>
          </div>
          <div className="image-container">
          <img src={petImage} alt="Happy pets" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
