import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Events Components
import EventSearch from "./components/EventSearchTD";
import EventDetails from "./components/EventDetailsTD";
import CreateEvent from "./components/CreateEventTD";
import ThreadList from "./components/ThreadList";
import ThreadForm from "./components/ThreadForm";
import AddTagsForm from "./components/AddTagForms";

// Pet Adoption Components
import AdoptionSearch from "./components/AdoptionSearch";
import AdoptionDetails from "./components/AdoptionDetails";
import CreateAdoptionListing from "./components/CreateAdoptionListing";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Events Pages */}
        <Route path="/events" element={<EventSearch />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/threads" element={<ThreadList />} />
        <Route path="/create-thread" element={<ThreadForm />} />
        <Route path="/add-tags" element={<AddTagsForm />} />

        {/* Pet Adoption Pages */}
        <Route path="/adoption" element={<AdoptionSearch />} />
        <Route path="/adoption/:id" element={<AdoptionDetails />} />
        <Route path="/adoption/create" element={<CreateAdoptionListing />} />
      </Routes>
    </Router>
  );
}

export default App;