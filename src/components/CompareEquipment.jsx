import React from "react";

const CompareEquipment = () => {
  const comparedItems = [
    { name: "Pet Leash", price: 20, rating: 4.5 },
    { name: "Dog Bowl", price: 15, rating: 4.8 },
  ];

  return (
    <div>
      <h1>Compare Equipment</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {comparedItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.rating}⭐</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareEquipment;
