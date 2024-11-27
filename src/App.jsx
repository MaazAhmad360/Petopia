import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VetSearchPage from './pages/VetSearchPage';
import VetDetailsPage from './pages/VetDetailsPage';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app">
                <header>
                    <h1>Pet Veterinary Services</h1>
                </header>
                <Routes>
    <Route path="/" element={<VetSearchPage />} />
    <Route path="/vet-details/:id" element={<VetDetailsPage />} /> {/* Dynamic route */}
</Routes>

            </div>
        </Router>
    );
};

export default App;
