import React, { useState } from "react";

const Rating = ({ onRate }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        if (!rating) {
            alert("Please select a rating.");
            return;
        }
        onRate({ rating, comment });
        setRating(0);
        setComment("");
    };

    return (
        <div className="rating">
            <h2>Rate This Vet</h2>
            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        style={{ color: star <= rating ? "gold" : "#ccc" }}
                        onClick={() => setRating(star)}
                    >
                        ★
                    </span>
                ))}
            </div>
            <textarea
                placeholder="Write a comment (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Rating;
