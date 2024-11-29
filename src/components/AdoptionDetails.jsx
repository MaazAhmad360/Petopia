import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Adoption.css';

// Mock pet data
const petDetails = {
  1: { name: "Bella", breed: "Labrador", age: 2, gender: "Female", location: "New York", description: "Friendly and playful." },
  2: { name: "Max", breed: "Golden Retriever", age: 4, gender: "Male", location: "Los Angeles", description: "Loves long walks." },
  3: { name: "Milo", breed: "Beagle", age: 1, gender: "Male", location: "Chicago", description: "Very active and curious." },
  4: { name: "Lucy", breed: "Bulldog", age: 3, gender: "Female", location: "Houston", description: "Calm and affectionate." },
};

const AdoptionDetails = () => {
  const { id } = useParams();
  const pet = petDetails[id];

  if (!pet) {
    return <p>Pet not found!</p>;
  }

  const handleBooking = () => {
    alert(`Booked adoption for ${pet.name}!`);
  };

  return (
    <div className="adoption-details">
      <h2>{pet.name}</h2>
      <p><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Age:</strong> {pet.age} years</p>
      <p><strong>Gender:</strong> {pet.gender}</p>
      <p><strong>Location:</strong> {pet.location}</p>
      <p><strong>Description:</strong> {pet.description}</p>
      <button onClick={handleBooking}>Book for Adoption</button>
    </div>
  );
};

export default AdoptionDetails;
