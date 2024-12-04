import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import necessary components/pages
import VetSearchPage from "./pages/VetSearchPage";
import VetDetailsPage from "./pages/VetDetailsPage";
import "./App.css";
import PrivateRoute from "./PrivateRoute";

// Events Components
import EventSearch from "./components/EventSearch";
import EventDetails from "./components/EventDetails";
import CreateEvent from "./components/CreateEvent";
import ThreadList from "./components/ThreadList";
import ThreadForm from "./components/ThreadForm";
import ReplyForm from "./components/replyToForm";

import AddTagsForm from "./components/AddTagForms";
import ThreadDetails from "./components/ThreadDetail";


// Pet Adoption Components
import AdoptionSearch from "./components/AdoptionSearch";
import AdoptionDetails from "./components/AdoptionDetails";
import CreateAdoptionListing from "./components/CreateAdoptionListing";
import HomePage from "./components/HomePage";

// Login/Signup
import Signup from "./pages/SignUp";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
        <Route index element={<HomePage />} />

        <Route element={<PrivateRoute />}>
          {/* Vet Pages */}
          <Route path="/veterinary" element={<VetSearchPage />} />
          <Route path="/vet-details/:id" element={<VetDetailsPage />} />

        {/* Events Pages */}
        <Route path="/events" element={<EventSearch />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/events/create" element={<CreateEvent />} />

        {/* threads */}
        <Route path="/forum" element={<ThreadList />} />

        <Route path="/threads" element={<ThreadList />} />
        <Route path="/create-thread" element={<ThreadForm />} />
        <Route path="/add-tags" element={<AddTagsForm />} />
        <Route path="/reply-threads" element={<ReplyForm />} />
        <Route path="/thread/:threadId" element={<ThreadDetails />} />


          {/* Pet Adoption Pages */}
          <Route path="/adoption" element={<AdoptionSearch />} />
          <Route path="/adoption/:id" element={<AdoptionDetails />} />
          <Route path="/adoption/create" element={<CreateAdoptionListing />} />
          </Route>
          {/* Login/Signup Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};



export default App;
