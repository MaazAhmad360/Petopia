import React from "react";
import WriteReview from "./WriteReview";
import Recommendations from "./Recommendations";

const EquipmentDetails = () => {
  const equipment = {
    id: 1,
    name: "Pet Leash",
    price: 20,
    description: "A durable leash for walking your pet.",
    image: "leash.jpg",
    reviews: [
      { user: "John", rating: 5, comment: "Great product!" },
      { user: "Jane", rating: 4, comment: "Very useful." },
    ],
  };

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
