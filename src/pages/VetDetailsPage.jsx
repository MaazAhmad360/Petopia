import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VetBookingForm from "../components/VetBookingForm";
import Rating from "../components/Rating";
import "../styles/VetDetails.css";
import Navbar from "../components/Navbar";

const VetDetailsPage = () => {
    const { id } = useParams(); // Extract the vet ID from the route parameter
    const [vet, setVet] = useState(null); // State for veterinarian details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch vet details from the backend
    useEffect(() => {
        const fetchVetDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/vet/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch vet details.");
                }
                const data = await response.json();
                setVet(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchVetDetails();
    }, [id]);

    const handleBooking = async (data) => {
        try {
            const response = await fetch(`http://localhost:5000/api/vet/${id}/book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to book session.");
            }

            const result = await response.json();
            alert(`Booked a session with ${vet.name} on ${data.date} at ${data.time}.`);
        } catch (err) {
            alert(`Error booking session: ${err.message}`);
        }
    };

    const handleRating = async (ratingData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/vet/${id}/rate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ratingData), // Make sure ratingData has "rating" and "comment"
            });
    
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || "Failed to submit rating.");
            }
    
            const result = await response.json();
            alert(result.message || `Rating submitted successfully!`);
        } catch (err) {
            alert(`Error submitting rating: ${err.message}`);
        }
    };
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="vet-details-page">
            {/* Sidebar for navigation */}
            <Navbar />
            <div className="vet-details">
                <h1>{vet.name}</h1>
                <p>Specialty: {vet.specialty}</p>
                <p>Experience: {vet.experience} years</p>
                <p>Contact: {vet.contact}</p>
                <p>Average Rating: {vet.averageRating.toFixed(1)}</p>
            </div>

            <VetBookingForm onBook={handleBooking} />
            <Rating onRate={handleRating} />
        </div>
    );
};

export default VetDetailsPage;
