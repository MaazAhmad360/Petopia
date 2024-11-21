import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventSearch from "./components/EventSearchTD";
import EventDetails from "./components/EventDetailsTD";
import CreateEvent from "./components/CreateEventTD";

function App() {
  return (
    <Router>
      <Routes>
        {/* Handle the root path with a Home component or redirect */}
        <Route path="/" element={<h1>Welcome to Petopia Events</h1>} />
        <Route path="/events" element={<EventSearch />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/events/create" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
