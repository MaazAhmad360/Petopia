const express = require("express");
const {
  getEquipmentCatalog,
  compareEquipment,
  getEquipmentDetails,
  writeReview,
  getRecommendations,
} = require("../controllers/equipmentController");

const router = express.Router();

// Equipment catalog routes
router.get("/", getEquipmentCatalog);
router.post("/compare", compareEquipment);
router.get("/:id", getEquipmentDetails);
router.post("/reviews", writeReview);
router.get("/recommendations", getRecommendations);

module.exports = router;
