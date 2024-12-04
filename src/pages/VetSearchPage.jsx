import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VetSearch.css";
import Navbar from "../components/Navbar";

const VetSearchPage = () => {
  const navigate = useNavigate();
  const [vets, setVets] = useState([]); // Initialize as an array
  const [searchName, setSearchName] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [maxExperience, setMaxExperience] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch veterinarians based on filters
  useEffect(() => {
    const fetchVets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:5000/api/vet?name=${searchName}&specialty=${filterSpecialty}&minExperience=${minExperience}&maxExperience=${maxExperience}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setVets(data); // Set the fetched data
      } catch (err) {
        setError(err.message);
        setVets([]); // Reset vets in case of an error
      } finally {
        setLoading(false);
      }
    };
    fetchVets();
  }, [searchName, filterSpecialty, minExperience, maxExperience]);

  const handleViewDetails = (vetId) => {
    navigate(`/vet-details/${vetId}`);
  };

  return (
    <div className="vet-search-page">
      {/* Sidebar for navigation */}
      <Navbar />
      <header>
        <h1>Pet Veterinary Services</h1>
      </header>
      <div className="vet-search">
        <input
          type="text"
          placeholder="Search Vets"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={() => {}}>Search</button>
      </div>
      <div className="vet-filter">
        <select
          value={filterSpecialty}
          onChange={(e) => setFilterSpecialty(e.target.value)}
        >
          <option value="">Filter by Specialty</option>
          <option value="General Practitioner">General Practitioner</option>
          <option value="Dentist">Dentist</option>
        </select>
        <select
          value={minExperience}
          onChange={(e) => setMinExperience(e.target.value)}
        >
          <option value="">Min Experience</option>
          <option value="1">1 Year</option>
          <option value="5">5 Years</option>
        </select>
        <select
          value={maxExperience}
          onChange={(e) => setMaxExperience(e.target.value)}
        >
          <option value="">Max Experience</option>
          <option value="5">5 Years</option>
          <option value="10">10 Years</option>
        </select>
      </div>

      {/* Show loading, error, or vet list */}
      <div className="vet-list">
        {loading ? (
          <p>Loading veterinarians...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : Array.isArray(vets) && vets.length > 0 ? (
          vets.map((vet) => (
            <div key={vet._id} className="vet-item">
              <h3>{vet.name}</h3>
              <p>Specialty: {vet.specialty}</p>
              <p>Experience: {vet.experience} years</p>
              <button onClick={() => handleViewDetails(vet._id)}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No veterinarians found.</p>
        )}
      </div>
    </div>
  );
};

export default VetSearchPage;
