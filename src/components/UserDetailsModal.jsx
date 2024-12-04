import React, { useState } from "react";
import "../styles/UserDetailsModal.css"; // Add styles for modal
import { updateUserDetails } from "../services/api"; // API call to save user details

const UserDetailsModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "Male",
    favoritePet: "",
    preferredBreeds: "",
    servicesLookingFor: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        preferredBreeds: formData.preferredBreeds.split(",").map((b) => b.trim()),
        servicesLookingFor: formData.servicesLookingFor.split(",").map((s) => s.trim()),
      };
      await updateUserDetails(formattedData); // Call API to save data
      setStatus("Details saved successfully!");
      onClose(); // Close modal
    } catch (error) {
      setStatus("Error saving details: " + error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />

          <label>Last Name:</label>
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />

          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label>Favorite Pet:</label>
          <input type="text" name="favoritePet" value={formData.favoritePet} onChange={handleChange} />

          <label>Preferred Breeds (comma-separated):</label>
          <input type="text" name="preferredBreeds" value={formData.preferredBreeds} onChange={handleChange} />

          <label>Services Looking For (comma-separated):</label>
          <input type="text" name="servicesLookingFor" value={formData.servicesLookingFor} onChange={handleChange} />

          <button type="submit">Save Details</button>
        </form>
        {status && <p>{status}</p>}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
