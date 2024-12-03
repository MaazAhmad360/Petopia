import React, { useEffect, useState } from "react";
import axios from "axios";

const EquipmentCatalog = () => {
  const [equipmentList, setEquipmentList] = useState([]); // Store fetched equipment list
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/equipment");
        setEquipmentList(response.data); // Set the fetched equipment data
      } catch (error) {
        console.error("Error fetching equipment:", error.response?.data || error.message);
      }
    };
    fetchEquipment();
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);

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
              <button>Compare</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EquipmentCatalog;