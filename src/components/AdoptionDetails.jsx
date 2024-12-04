import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Adoption.css";
import Navbar from "./Navbar";

const AdoptionDetails = () => {
  const { id } = useParams(); // Get pet ID from URL
  const [pet, setPet] = useState(null); // Store pet details

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pet/${id}`);
        setPet(response.data);
      } catch (error) {
        console.error("Error fetching pet details:", error.response?.data || error.message);
      }
    };    
    fetchPetDetails();
  }, [id]);

  if (!pet) {
    return <p>Loading pet details...</p>;
  }

  const handleBooking = () => {
    alert(`Booked adoption for ${pet.name}!`);
  };

  return (
    <div className="adoption-details">
      {/* Sidebar for navigation */}
      <Navbar />
      <h2>{pet.name}</h2>
      <p><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Age:</strong> {pet.age} years</p>
      <p><strong>Gender:</strong> {pet.gender}</p>
      <p><strong>Location:</strong> {pet.location}</p>
      <p><strong>Description:</strong> {pet.description}</p>
      <button onClick={handleBooking}>Book for Adoption</button>
    </div>
  );
};

export default AdoptionDetails;
