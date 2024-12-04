import React, { useEffect, useState } from "react";
import axios from "axios";

const EquipmentCatalog = () => {
  const [equipmentList, setEquipmentList] = useState([]); // Store fetched equipment list
  const [search, setSearch] = useState("");
  const [compareList, setCompareList] = useState([]); // Store selected items for comparison

  // Fetch the equipment list on component mount
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/equipment");
        setEquipmentList(response.data); // Set the fetched equipment data
      } catch (error) {
        console.error(
          "Error fetching equipment:",
          error.response?.data || error.message
        );
      }
    };
    fetchEquipment();
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);

  // Handle adding an item to the comparison list
  const handleCompare = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/equipment/compare",
        { id } // Send the item ID for comparison
      );
      setCompareList((prevList) => [...prevList, response.data]); // Add the response data to the comparison list
      console.log("Added to comparison:", response.data);
    } catch (error) {
      console.error(
        "Error adding to comparison:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h1>Equipment Catalog</h1>
      <input
        type="text"
        placeholder="Search equipment..."
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="catalog">
        {equipmentList
          .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <div key={item.id} className="equipment-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <p>Rating: {item.rating}⭐</p>
              <button onClick={() => handleCompare(item.id)}>Compare</button>
            </div>
          ))}
      </div>
      {compareList.length > 0 && (
        <div className="comparison-section">
          <h2>Comparison List</h2>
          <ul>
            {compareList.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} - Rating: {item.rating}⭐
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EquipmentCatalog;
