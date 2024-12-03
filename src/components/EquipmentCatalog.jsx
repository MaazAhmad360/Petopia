import React, { useState } from "react";

const EquipmentCatalog = () => {
  const [equipmentList] = useState([
    { id: 1, name: "Pet Leash", price: 20, rating: 4.5, image: "leash.jpg" },
    { id: 2, name: "Dog Bowl", price: 15, rating: 4.8, image: "bowl.jpg" },
  ]);

  const [search, setSearch] = useState("");

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
