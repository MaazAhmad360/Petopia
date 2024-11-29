import express from 'express';
import { addPet, getAllPets } from '../controllers/petController.js';

const router = express.Router();

// Add a new pet
router.post('/', addPet);

// Get all pets
router.get('/', getAllPets);

export default router;
