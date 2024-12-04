import React from 'react';
import '../styles/VetSearch.css';

const VetFilter = ({ onFilter }) => {
    const handleFilterChange = (e) => {
        onFilter(e.target.value);
    };

    return (
        <div className="vet-filter">
            <select onChange={handleFilterChange}>
                <option value="">Filter by Specialty</option>
                <option value="general">General Vet</option>
                <option value="surgery">Surgery</option>
                <option value="dentistry">Dentistry</option>
            </select>
            <select onChange={handleFilterChange}>
                <option value="">Filter by Experience</option>
                <option value="1-5">1-5 Years</option>
                <option value="5-10">5-10 Years</option>
                <option value="10+">10+ Years</option>
            </select>
        </div>
    );
};

export default VetFilter;
