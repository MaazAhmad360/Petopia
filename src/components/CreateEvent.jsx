import React, { useState } from "react";
import "./../styles/Events.css";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for backend call
    console.log("Creating event with data:", formData);
  };

  return (
    <div className="create-event">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value })
          }
        >
          <option value="">Select Type</option>
          <option value="Fair">Fair</option>
          <option value="Adoption">Adoption</option>
        </select>
        <input
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
