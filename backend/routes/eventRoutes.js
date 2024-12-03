import express from 'express';
import { createEvent, getAllEvents } from '../controllers/eventController.js';

const router = express.Router();

// Create a new event
router.post('/', createEvent);

// Get all events
router.get('/', getAllEvents);

export default router;
