import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../AxioInstance"; // Axios instance with authentication

const EventDetails = () => {
  const { id } = useParams(); // Extract event ID from the URL
  const [event, setEvent] = useState(null); // State for event details
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/api/event/${id}`); // Fetch event details by ID
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleRegister = async () => {
    try {
      const response = await axios.post("/event/register", { eventId: id }); // Send event ID for registration
      alert(response.data.message); // Display success message
    } catch (error) {
      console.error("Error registering for event:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to register for the event.");
    }
  };

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (!event) {
    return <p>Event details could not be found!</p>;
  }

  return (
    <div className="event-details">
      <h2>{event.name}</h2>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <button onClick={handleRegister}>Register for Event</button>
    </div>
  );
};

export default EventDetails;
