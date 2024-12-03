import React, { useEffect, useState } from "react";
import axios from "axios";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]); // State to store fetched recommendations
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recommendations");
        setRecommendations(response.data); // Set the fetched recommendations data
      } catch (error) {
        setError("Error fetching recommendations.");
        console.error("Error fetching recommendations:", error.response?.data || error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchRecommendations();
  }, []);

  if (loading) return <p>Loading recommendations...</p>; // Show loading state
  if (error) return <p>{error}</p>; // Show error message if any

  return (
    <div>
      <h3>Recommended Equipment</h3>
      <div className="recommendations">
        {recommendations.map((item) => (
          <div key={item.id} className="recommendation-card">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;