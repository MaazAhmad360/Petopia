import React from 'react';
import { useParams } from 'react-router-dom';

// Sample data (for demo purposes)
const eventDetails = {
  1: { name: "Pet Adoption Fair", date: "2024-12-01", location: "Central Park", description: "Join us for a day of pet adoption!" },
  2: { name: "Dog Training Class", date: "2024-12-05", location: "Downtown Gym", description: "Learn how to train your dog with expert trainers!" },
  3: { name: "Vet Health Check", date: "2024-12-10", location: "Petopia Clinic", description: "Free health check for pets by licensed vets!" }
};

const EventDetails = () => {
  const { id } = useParams();
  const event = eventDetails[id];

  if (!event) {
    return <p>Event not found!</p>;
  }

  return (
    <div>
      <h2>{event.name}</h2>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
    </div>
  );
};

export default EventDetails;
