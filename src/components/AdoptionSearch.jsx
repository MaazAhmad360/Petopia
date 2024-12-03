import React, { useState } from 'react';
import '../styles/Adoption.css';

// Mock pet data
const pets = [
  { id: 1, name: "Bella", breed: "Labrador", age: 2, gender: "Female", location: "New York" },
  { id: 2, name: "Max", breed: "Golden Retriever", age: 4, gender: "Male", location: "Los Angeles" },
  { id: 3, name: "Milo", breed: "Beagle", age: 1, gender: "Male", location: "Chicago" },
  { id: 4, name: "Lucy", breed: "Bulldog", age: 3, gender: "Female", location: "Houston" },
];

const AdoptionSearch = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ breed: '', location: '', age: '', gender: '' });

  const filteredPets = pets.filter((pet) =>
    (search === '' || pet.name.toLowerCase().includes(search.toLowerCase())) &&
    (filters.breed === '' || pet.breed === filters.breed) &&
    (filters.location === '' || pet.location === filters.location) &&
    (filters.age === '' || pet.age === Number(filters.age)) &&
    (filters.gender === '' || pet.gender === filters.gender)
  );

  return (
    <div className="adoption-search">
      <h2>Search Pets for Adoption</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="filters">
        <select onChange={(e) => setFilters({ ...filters, breed: e.target.value })}>
          <option value="">All Breeds</option>
          <option value="Labrador">Labrador</option>
          <option value="Golden Retriever">Golden Retriever</option>
          <option value="Beagle">Beagle</option>
          <option value="Bulldog">Bulldog</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, location: e.target.value })}>
          <option value="">All Locations</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
          <option value="Houston">Houston</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, age: e.target.value })}>
          <option value="">All Ages</option>
          <option value="1">1 year</option>
          <option value="2">2 years</option>
          <option value="3">3 years</option>
          <option value="4">4 years</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, gender: e.target.value })}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <ul className="pet-list">
        {filteredPets.map((pet) => (
          <li key={pet.id}>
            <h3>{pet.name}</h3>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age} years</p>
            <p>Gender: {pet.gender}</p>
            <p>Location: {pet.location}</p>
            <a href={`/adoption/${pet.id}`}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdoptionSearch;
