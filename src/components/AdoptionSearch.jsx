import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Adoption.css";
import Navbar from "./Navbar";

const AdoptionSearch = () => {
  const [pets, setPets] = useState([]); // All pets
  const [filters, setFilters] = useState({ breed: "", location: "", minAge: "", maxAge: "" }); // Filter criteria
  const [filteredPets, setFilteredPets] = useState([]); // Filtered pets
  const navigate = useNavigate(); // To navigate to the details page

  // Fetch pets from backend
  const fetchPets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/pet");
      setPets(response.data); // All pets
      setFilteredPets(response.data); // Initially, all pets are shown
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  // Filter pets based on user input
  const applyFilters = () => {
    const filtered = pets.filter((pet) => {
      const matchesBreed = !filters.breed || pet.breed.toLowerCase().includes(filters.breed.toLowerCase());
      const matchesLocation = !filters.location || pet.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesMinAge = !filters.minAge || pet.age >= parseInt(filters.minAge);
      const matchesMaxAge = !filters.maxAge || pet.age <= parseInt(filters.maxAge);
      return matchesBreed && matchesLocation && matchesMinAge && matchesMaxAge;
    });
    setFilteredPets(filtered);
  };

  // Fetch pets on component mount
  useEffect(() => {
    fetchPets();
  }, []);

  // Apply filters when criteria change
  useEffect(() => {
    applyFilters();
  }, [filters, pets]);

  const handleNavigate = (id) => {
    navigate(`/adoption/${id}`); // Navigate to details page
  };

  return (
    <div className="adoption-search">
      {/* Sidebar for navigation */}
      <Navbar />
      <h2>Search Pets for Adoption</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Breed"
          value={filters.breed}
          onChange={(e) => setFilters((prev) => ({ ...prev, breed: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Min Age"
          value={filters.minAge}
          onChange={(e) => setFilters((prev) => ({ ...prev, minAge: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Max Age"
          value={filters.maxAge}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxAge: e.target.value }))}
        />
      </div>
      <ul className="pet-list">
        {filteredPets.map((pet) => (
          <li key={pet._id}>
            <h3>{pet.name}</h3>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age} years</p>
            <p>Location: {pet.location}</p>
            <button onClick={() => handleNavigate(pet._id)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdoptionSearch;
