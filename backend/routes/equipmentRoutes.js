import express from "express";
import {
  getEquipmentCatalog,
  compareEquipment,
  getEquipmentDetails,
  writeReview,
  getRecommendations,
} from "../controllers/equipmentController.js";

const router = express.Router();

// Equipment catalog routes
router.get("/", getEquipmentCatalog);
router.post("/compare", compareEquipment);
router.get("/:id", getEquipmentDetails);
router.post("/reviews", writeReview);
router.get("/recommendations", getRecommendations);

export default router;