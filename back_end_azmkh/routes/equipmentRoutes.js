const express = require("express");
const {
  getEquipmentCatalog,
  compareEquipment,
  getEquipmentDetails,
  writeReview,
  getRecommendations,
} = require("../controllers/equipmentController");

const router = express.Router();

router.get("/", getEquipmentCatalog);
router.post("/compare", compareEquipment);
router.get("/:id", getEquipmentDetails);
router.post("/reviews", writeReview);
router.get("/recommendations", getRecommendations);

export default router; // Add this line to export as default
