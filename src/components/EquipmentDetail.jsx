import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import WriteReview from "./WriteReview";
import Recommendations from "./Recommendations";

const EquipmentDetails = () => {
  const { id } = useParams(); // Get the equipment ID from the URL
  const [equipment, setEquipment] = useState(null); // State to store fetched equipment data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/equipment/${id}`);
        setEquipment(response.data); // Set the fetched equipment data
      } catch (error) {
        setError("Error fetching equipment details.");
        console.error("Error fetching equipment:", error.response?.data || error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchEquipment();
  }, [id]);

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p>{error}</p>; // Show error message if any

  return (
    <div>
      <h1>{equipment.name}</h1>
      <img src={equipment.image} alt={equipment.name} />
      <p>{equipment.description}</p>
      <p>Price: ${equipment.price}</p>
      <button>Add to Cart</button>
      <button>Compare</button>

      <h2>Reviews</h2>
      <div>
        {equipment.reviews.map((review, index) => (
          <div key={index}>
            <p>
              <strong>{review.user}:</strong> {review.comment} (
              {review.rating}⭐)
            </p>
          </div>
        ))}
      </div>
      <WriteReview />
      <Recommendations />
    </div>
  );
};

export default EquipmentDetails;