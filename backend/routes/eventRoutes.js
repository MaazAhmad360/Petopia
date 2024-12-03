import express from 'express';
import { createEvent, getAllEvents, getEventById, registerForEvent } from '../controllers/eventController.js';

const router = express.Router();

// Create a new event
router.post('/', createEvent);

// Get all events
router.get('/', getAllEvents);

// Get event details by ID
router.get("/:id", getEventById);

// Register for an event
router.post("/register", registerForEvent);

export default router;
