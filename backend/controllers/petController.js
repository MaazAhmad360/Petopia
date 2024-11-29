import Pet from "../models/pet.js";

// Add a new pet
export const addPet = async (req, res) => {
  try {
    const petData = req.body;
    const newPet = new Pet(petData);
    await newPet.save();
    res.status(201).json({ message: "Pet added successfully!", pet: newPet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all pets
export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate("owner");
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
