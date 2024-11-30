import React from "react";

const Recommendations = () => {
  const recommendations = [
    { id: 2, name: "Dog Bowl", price: 15, image: "bowl.jpg" },
    { id: 3, name: "Pet Bed", price: 50, image: "bed.jpg" },
  ];

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
