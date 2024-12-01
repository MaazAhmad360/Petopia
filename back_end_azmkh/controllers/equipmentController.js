const Equipment = require("../models/Equipment");
const Review = require("../models/Review");

// Get all equipment
exports.getEquipmentCatalog = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Compare equipment by IDs
exports.compareEquipment = async (req, res) => {
  try {
    const { ids } = req.body; // Array of equipment IDs
    const equipment = await Equipment.find({ _id: { $in: ids } });
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get equipment details
exports.getEquipmentDetails = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    const reviews = await Review.find({ equipmentId: req.params.id });
    res.json({ equipment, reviews });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Write a review
exports.writeReview = async (req, res) => {
  try {
    const { equipmentId, user, rating, comment } = req.body;
    const review = new Review({ equipmentId, user, rating, comment });
    await review.save();
    res.json({ message: "Review added successfully", review });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get equipment recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await Equipment.find().sort({ rating: -1 }).limit(3);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
