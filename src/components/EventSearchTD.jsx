import React from 'react';

const events = [
  { id: 1, name: "Pet Adoption Fair", date: "2024-12-01", location: "Central Park" },
  { id: 2, name: "Dog Training Class", date: "2024-12-05", location: "Downtown Gym" },
  { id: 3, name: "Vet Health Check", date: "2024-12-10", location: "Petopia Clinic" }
];

const EventSearch = () => {
  return (
    <div>
      <h2>Event Search Page</h2>
      <p>Browse upcoming pet-related events:</p>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <a href={`/events/${event.id}`}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventSearch;
