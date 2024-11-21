import React from "react";
import { useParams } from "react-router-dom";
import "./../styles/Events.css";

const EventDetails = () => {
  const { id } = useParams();
  const event = { id, name: "Pet Fair 2024", type: "Fair", date: "2024-12-01" };

  const handleRegister = () => {
    // Placeholder for backend call
    console.log(`Registering for event: ${id}`);
  };

  return (
    <div className="event-details">
      <h1>{event.name}</h1>
      <p>Type: {event.type}</p>
      <p>Date: {event.date}</p>
      <button onClick={handleRegister}>Register for Event</button>
    </div>
  );
};

export default EventDetails;
