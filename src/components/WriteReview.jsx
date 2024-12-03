import React, { useState } from "react";
import axios from "axios";

const WriteReview = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
  const [success, setSuccess] = useState(null); // State to manage success message

  const handleSubmit = async () => {
    if (rating === 0 || review.trim() === "") {
      alert("Please provide a rating and a review.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:5000/api/reviews", {
        review,
        rating,
      });
      setSuccess("Review submitted successfully!");
      setReview("");
      setRating(0);
    } catch (error) {
      setError("Error submitting review.");
      console.error("Error submitting review:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Write a Review</h3>
      <textarea
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        <option value={0}>Select Rating</option>
        {[1, 2, 3, 4, 5].map((star) => (
          <option key={star} value={star}>
            {star} Stars
          </option>
        ))}
      </select>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default WriteReview;