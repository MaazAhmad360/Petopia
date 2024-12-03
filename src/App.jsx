import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import only necessary components/pages
import VetSearchPage from "./pages/VetSearchPage";
import VetDetailsPage from "./pages/VetDetailsPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Pet Veterinary Services</h1>
        </header>
        <Routes>
          {/* Active Routes */}
          <Route path="/" element={<VetSearchPage />} />
          <Route path="/vet-details/:id" element={<VetDetailsPage />} /> {/* Dynamic route */}

          {/* Uncomment and use other routes when needed */}
          {/*
          <Route path="/events" element={<EventSearch />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/threads" element={<ThreadList />} />
          <Route path="/create-thread" element={<ThreadForm />} />
          <Route path="/add-tags" element={<AddTagsForm />} />
          <Route path="/adoption" element={<AdoptionSearch />} />
          <Route path="/adoption/:id" element={<AdoptionDetails />} />
          <Route path="/adoption/create" element={<CreateAdoptionListing />} />
          <Route path="/compare-equipment" element={<CompareEquipment />} />
          <Route path="/equipment-catalog" element={<EquipmentCatalog />} />
          <Route path="/equipment-details" element={<EquipmentDetails />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/write-review" element={<WriteReview />} />
          */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
