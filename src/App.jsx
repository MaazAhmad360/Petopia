import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventSearch from "./components/EventSearchTD";
import EventDetails from "./components/EventDetailsTD";
import CreateEvent from "./components/CreateEventTD";
import ThreadList from "./components/ThreadList";
import ThreadForm from "./components/ThreadForm";
import AddTagsForm from "./components/AddTagForms";

function App() {
  return (
    <Router>
      <Routes>
        {/* Handle the root path with a Home component or redirect */}
        <Route path="/" element={<h1>Welcome to Petopia Events</h1>} />
        <Route path="/events" element={<EventSearch />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/" element={<ThreadList />} />
        <Route path="/create-thread" element={<ThreadForm />} />
        <Route path="/add-tags" element={<AddTagsForm />} />
      </Routes>
    </Router>
  );
}

export default App;
