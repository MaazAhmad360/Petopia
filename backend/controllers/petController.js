import mongoose from 'mongoose';
import Pet from '../models/pet.js';


// Add a new pet
export const addPet = async (req, res) => {
  try {
    const petData = req.body;
    const newPet = new Pet(petData);
    await newPet.save();
    res.status(201).json({ message: 'Pet added successfully!', pet: newPet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all pets
export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate('owner');
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a pet by ID
export const getPetById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format before querying
    /* if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid pet ID format' });
    } */

    console.log("Fetching pet with ID:", id);
    const pet = await Pet.findById(id).populate('owner'); // Optionally populate owner

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

