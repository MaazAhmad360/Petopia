import React, { useState } from 'react';
import '../styles/VetDetails.css';

const VetBookingForm = ({ onBook }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onBook({ date, time });
    };

    return (
        <form className="vet-booking-form" onSubmit={handleSubmit}>
            <h3>Book a Vet Session</h3>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
            />
            <button type="submit">Book</button>
        </form>
    );
};

export default VetBookingForm;
