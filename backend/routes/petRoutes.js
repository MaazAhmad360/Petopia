import express from 'express';
import { addPet, getAllPets, getPetById } from '../controllers/petController.js';

const router = express.Router();

// Add a new pet
router.post('/', addPet);

// Get all pets
router.get('/', getAllPets);

// Get a pet by ID
router.get('/:id', getPetById);

export default router;
