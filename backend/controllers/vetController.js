import Veterinarian from "../models/vet.js";

// Add a new veterinarian
export const addVeterinarian = async (req, res) => {
  try {
    const vetData = req.body;
    const newVet = new Veterinarian(vetData);
    await newVet.save();
    res
      .status(201)
      .json({ message: "Veterinarian added successfully!", vet: newVet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all veterinarians
export const getAllVeterinarians = async (req, res) => {
  try {
    const vets = await Veterinarian.find();
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
