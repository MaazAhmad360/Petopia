import React, { useState } from "react";
import "./../styles/Events.css";

const EventSearch = () => {
  const [events, setEvents] = useState([
    { id: 1, name: "Pet Fair 2024", type: "Fair", date: "2024-12-01" },
    { id: 2, name: "Adoption Drive", type: "Adoption", date: "2024-12-05" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterType || event.type === filterType)
  );

  return (
    <div className="event-search">
      <h1>Search Events</h1>
      <input
        type="text"
        placeholder="Search events"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="Fair">Fair</option>
        <option value="Adoption">Adoption</option>
      </select>
      <div className="event-list">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-item">
            <h3>{event.name}</h3>
            <p>Type: {event.type}</p>
            <p>Date: {event.date}</p>
            <a href={`/events/${event.id}`}>View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSearch;
