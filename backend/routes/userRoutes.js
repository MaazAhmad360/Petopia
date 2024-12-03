import express from 'express';
import { registerUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Get all users
router.get('/', getAllUsers);

export default router;
