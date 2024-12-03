import express from 'express';
import { createEvent, getAllEvents,getEventById } from '../controllers/eventController.js';

const router = express.Router();

// Create a new event
router.post('/', createEvent);

// Get all events
router.get('/', getAllEvents);

// Get event details by ID
router.get("/:id", getEventById);


export default router;
