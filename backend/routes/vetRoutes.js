import express from "express";
import {
  addVeterinarian,
  getAllVeterinarians,
} from "../controllers/vetController.js";

const router = express.Router();

// Add a new veterinarian
router.post("/", addVeterinarian);

// Get all veterinarians
router.get("/", getAllVeterinarians);

export default router;
