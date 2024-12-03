import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Events.css";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    type: "",
  });

  const navigate = useNavigate(); // Hook to redirect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/event",formData);
      alert(response.data.message);
      setFormData({ name: "", date: "", location: "", type: "" });
      navigate("/events"); // Redirect to the events page
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    }
  };

  return (
    <div className="create-event">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
  <input
    type="text"
    name="name"
    placeholder="Event Name"
    value={formData.name}
    onChange={handleChange}
    required
  />
  <input
    type="date"
    name="date"
    value={formData.date}
    onChange={handleChange}
    required
  />
  <input
    type="text"
    name="location"
    placeholder="Location"
    value={formData.location}
    onChange={handleChange}
    required
  />
  {/* Replacing the dropdown with a text input for event type */}
  <input
    type="text"
    name="type"
    placeholder="Event Type"
    value={formData.type}
    onChange={handleChange}
    required
  />
  <button type="submit">Create Event</button>
</form>

    </div>
  );
};

export default CreateEvent;
