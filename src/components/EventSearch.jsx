<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Events.css";

const EventSearch = () => {
  const [events, setEvents] = useState([]); // All events from backend
  const [filteredEvents, setFilteredEvents] = useState([]); // Events after filtering
  const [filters, setFilters] = useState({ search: "", location: "" }); // Filter criteria

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/event");
      setEvents(response.data.events); // Populate events state
      setFilteredEvents(response.data.events); // Initially, filteredEvents = all events
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events by name and location
  const applyFilters = () => {
    const filtered = events.filter((event) => {
      const matchesSearch =
        !filters.search || event.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesLocation =
        !filters.location || event.location.toLowerCase().includes(filters.location.toLowerCase());
      return matchesSearch && matchesLocation;
    });
    setFilteredEvents(filtered); // Update filtered events
  };

  // Reset filters and show all events
  const handleReset = () => {
    setFilters({ search: "", location: "" }); // Clear filter criteria
    setFilteredEvents(events); // Reset filtered events to all events
  };

  useEffect(() => {
    applyFilters(); // Apply filters whenever `filters` or `events` change
  }, [filters, events]);

  return (
    <div className="event-search">
      <h2>Search Events</h2>

      {/* Search by name */}
      <input
        type="text"
        placeholder="Search events by name"
        value={filters.search}
        onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
      />

      {/* Filter by location */}
      <input
        type="text"
        placeholder="Filter by location"
        value={filters.location}
        onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
      />

      {/* Reset Button */}
      <button onClick={handleReset}>Reset Filters</button>

      {/* Display filtered events */}
      <ul>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <li key={event._id}>
              <h3>{event.name}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>{event.location}</p>
              <a href={`/events/${event._id}`}>View Details</a>
            </li>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </ul>
    </div>
  );
};

export default EventSearch;
=======
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "../styles/Events.css";

const EventSearch = () => {
  const [events, setEvents] = useState([]); // All events from backend
  const [filteredEvents, setFilteredEvents] = useState([]); // Events after filtering
  const [filters, setFilters] = useState({ search: "", location: "" }); // Filter criteria
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/event");
      setEvents(response.data.events); // Populate events state
      setFilteredEvents(response.data.events); // Initially, filteredEvents = all events
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events by name and location
  const applyFilters = () => {
    const filtered = events.filter((event) => {
      const matchesSearch =
        !filters.search || event.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesLocation =
        !filters.location || event.location.toLowerCase().includes(filters.location.toLowerCase());
      return matchesSearch && matchesLocation;
    });
    setFilteredEvents(filtered); // Update filtered events
  };

  // Reset filters and show all events
  const handleReset = () => {
    setFilters({ search: "", location: "" }); // Clear filter criteria
    setFilteredEvents(events); // Reset filtered events to all events
  };

  useEffect(() => {
    applyFilters(); // Apply filters whenever `filters` or `events` change
  }, [filters, events]);

  const handleViewDetails = (id) => {
    navigate(`/events/${id}`); // Programmatically navigate to the event details page
  };

  return (
    <div className="event-search">
      <h2>Search Events</h2>

      {/* Search by name */}
      <input
        type="text"
        placeholder="Search events by name"
        value={filters.search}
        onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
      />

      {/* Filter by location */}
      <input
        type="text"
        placeholder="Filter by location"
        value={filters.location}
        onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
      />

      {/* Reset Button */}
      <button onClick={handleReset}>Reset Filters</button>

      {/* Display filtered events */}
      <ul>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <li key={event._id}>
              <h3>{event.name}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>{event.location}</p>
              <button onClick={() => handleViewDetails(event._id)}>View Details</button>
            </li>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </ul>
    </div>
  );
};

export default EventSearch;
>>>>>>> main
