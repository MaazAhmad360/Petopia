import React, { useState } from "react";
import axios from "axios";
import "../styles/Adoption.css";

const CreateAdoptionListing = () => {
  const [formData, setFormData] = useState({
    name: "",
    species: "", // Added species
    breed: "",
    age: "",
    gender: "",
    location: "", // Matches the added location field in the model
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/pet", formData);
      alert(`Adoption listing created successfully for ${response.data.pet.name}!`);
      setFormData({
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
        location: "",
        description: "",
      }); // Reset form fields
    } catch (error) {
      console.error("Error creating adoption listing:", error);
      alert(error.response?.data?.error || "Failed to create adoption listing.");
    }
  };

  return (
    <div className="create-adoption">
      <h2>Create Adoption Listing</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="species"
          placeholder="Species"
          value={formData.species}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={formData.breed}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default CreateAdoptionListing;
