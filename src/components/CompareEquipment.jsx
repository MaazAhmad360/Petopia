import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CompareEquipment = () => {
  const [equipmentList, setEquipmentList] = useState([]); // Store list of equipment
  const [selectedEquipment, setSelectedEquipment] = useState([]); // Store selected equipment for comparison

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/equipment");
        setEquipmentList(response.data);
      } catch (error) {
        console.error("Error fetching equipment:", error.response?.data || error.message);
      }
    };
    fetchEquipment();
  }, []);

  const toggleSelection = (item) => {
    setSelectedEquipment((prevSelected) => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter((i) => i !== item); // Remove item if already selected
      } else {
        return [...prevSelected, item]; // Add item to selection
      }
    });
  };

  const handleCompare = () => {
    alert(`Comparing: ${selectedEquipment.map(item => item.name).join(", ")}`);
  };

  return (
    <div>
      <h1>Compare Equipment</h1>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Price</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {equipmentList.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedEquipment.includes(item)}
                  onChange={() => toggleSelection(item)}
                />
              </td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.rating}⭐</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCompare} disabled={selectedEquipment.length === 0}>
        Compare Selected Equipment
      </button>
    </div>
  );
};

export default CompareEquipment;