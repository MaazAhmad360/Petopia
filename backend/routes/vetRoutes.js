import express from "express";
import {
  addVeterinarian,
  getAllVeterinarians,
  getVetById,
  bookVetSession,
  rateVet,
} from "../controllers/vetController.js";

const router = express.Router();

// Route to add a new veterinarian
router.post("/", addVeterinarian);

// Route to get all veterinarians (with optional filters)
router.get("/", getAllVeterinarians);

// Route to get a veterinarian by ID
router.get("/:id", getVetById);

// Route to book an appointment for a veterinarian
router.post("/:id/book", bookVetSession);





// Route to rate a veterinarian
router.post("/:id/rate", rateVet);

export default router;
