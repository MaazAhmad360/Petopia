import React from "react";
import { useParams } from "react-router-dom";
import VetDetails from "../components/VetDetails";
import VetBookingForm from "../components/VetBookingForm";
import Rating from "../components/Rating";
import "../styles/VetDetails.css";

const VetDetailsPage = () => {
    const { id } = useParams(); // Extract the vet ID from the route parameter

    // Dummy vet data
    const vet = {
        id,
        name: id === "1" ? "Dr. John Smith" : "Dr. Alice Johnson",
        specialty: id === "1" ? "General Practitioner" : "Dentist",
        experience: id === "1" ? 10 : 8,
        contact: id === "1" ? "123-456-7890" : "987-654-3210",
    };

    const handleBooking = (data) => {
        alert(`Booked a session with ${vet.name} on ${data.date} at ${data.time}.`);
    };

    const handleRating = (rating) => {
        alert(`You rated ${vet.name} ${rating} stars.`);
    };

    return (
        <div className="vet-details-page">
            <VetDetails vet={vet} />
            <VetBookingForm onBook={handleBooking} />
            <Rating onRate={handleRating} />
        </div>
    );
};

export default VetDetailsPage;
