import React, { useState } from 'react';

const Rating = ({ onRate }) => {
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);
        onRate(value);
    };

    return (
        <div className="rating">
            <h3>Rate This Vet</h3>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={rating >= star ? 'filled' : ''}
                    onClick={() => handleRating(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default Rating;
