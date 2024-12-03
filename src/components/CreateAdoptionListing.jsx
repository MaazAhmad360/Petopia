import React, { useState } from 'react';
import '../styles/Adoption.css';

const CreateAdoptionListing = () => {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    gender: '',
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Adoption listing created for ${formData.name}!`);
    // Backend call can be added here.
  };

  return (
    <div className="create-adoption">
      <h2>Create Adoption Listing</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="breed" placeholder="Breed" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default CreateAdoptionListing;
