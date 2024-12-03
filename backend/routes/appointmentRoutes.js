import express from 'express';
import { scheduleAppointment, getAllAppointments } from '../controllers/appointmentController.js';

const router = express.Router();

// Schedule an appointment
router.post('/', scheduleAppointment);

// Get all appointments
router.get('/', getAllAppointments);

export default router;
