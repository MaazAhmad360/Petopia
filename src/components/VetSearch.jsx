import React, { useState } from 'react';
import '../styles/VetSearch.css';

const VetSearch = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        onSearch(searchText);
    };

    return (
        <div className="vet-search">
            <input
                type="text"
                placeholder="Search Vets"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default VetSearch;
