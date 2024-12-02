import React, { useState } from "react";

const WriteReview = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    alert(`Review submitted! Rating: ${rating}, Comment: ${review}`);
    setReview("");
    setRating(0);
  };

  return (
    <div>
      <h3>Write a Review</h3>
      <textarea
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value={0}>Select Rating</option>
        {[1, 2, 3, 4, 5].map((star) => (
          <option key={star} value={star}>
            {star} Stars
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

export default WriteReview;
