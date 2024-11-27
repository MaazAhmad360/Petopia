import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VetSearch from "../components/VetSearch";
import VetFilter from "../components/VetFilter";
import "../styles/VetSearch.css";

const VetSearchPage = () => {
    const navigate = useNavigate();
    const [vets] = useState([
        { id: 1, name: "Dr. John Smith", specialty: "General Practitioner" },
        { id: 2, name: "Dr. Alice Johnson", specialty: "Dentist" },
    ]);

    const handleViewDetails = (vetId) => {
        navigate(`/vet-details/${vetId}`);
    };

    return (
        <div className="vet-search-page">
            <header>
                <h1>Pet Veterinary Services</h1>
            </header>
            <div className="vet-search">
                <input type="text" placeholder="Search Vets" />
                <button>Search</button>
            </div>
            <div className="vet-filter">
                <select>
                    <option value="">Filter by Specialty</option>
                    <option value="General">General Practitioner</option>
                    <option value="Dentist">Dentist</option>
                </select>
                <select>
                    <option value="">Filter by Experience</option>
                    <option value="1-5">1-5 Years</option>
                    <option value="5-10">5-10 Years</option>
                </select>
            </div>
            <div className="vet-list">
                {vets.map((vet) => (
                    <div key={vet.id} className="vet-item">
                        <h3>{vet.name}</h3>
                        <p>Specialty: {vet.specialty}</p>
                        <button onClick={() => handleViewDetails(vet.id)}>
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VetSearchPage;
