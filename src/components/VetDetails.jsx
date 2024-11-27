import React from 'react';
import '../styles/VetDetails.css';

const VetDetails = ({ vet }) => {
    return (
        <div className="vet-details">
            <h2>{vet.name}</h2>
            <p>Specialty: {vet.specialty}</p>
            <p>Experience: {vet.experience} years</p>
            <p>Contact: {vet.contact}</p>
        </div>
    );
};

export default VetDetails;
