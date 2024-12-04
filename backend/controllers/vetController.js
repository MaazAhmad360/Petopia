import Veterinarian from "../models/vet.js";

// Add a new veterinarian
export const addVeterinarian = async (req, res) => {
  try {
    const vetData = req.body;
    const newVet = new Veterinarian(vetData);
    await newVet.save();
    res
      .status(201)
      .json({ message: "Veterinarian added successfully!", vet: newVet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all veterinarians (with search and filter functionality)
export const getAllVeterinarians = async (req, res) => {
  try {
    const { specialty, minExperience, maxExperience, name } = req.query;

    const filter = {};

    // Search by name
    if (name) {
      filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    // Filter by specialty
    if (specialty) {
      filter.specialty = { $regex: specialty, $options: "i" }; // Case-insensitive filter
    }

    // Filter by experience range
    if (minExperience || maxExperience) {
      filter.experience = {};
      if (minExperience) filter.experience.$gte = parseInt(minExperience);
      if (maxExperience) filter.experience.$lte = parseInt(maxExperience);
    }

    const vets = await Veterinarian.find(filter);
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single veterinarian's details by ID
export const getVetById = async (req, res) => {
  try {
    const vet = await Veterinarian.findById(req.params.id);
    if (!vet) {
      return res.status(404).json({ message: "Veterinarian not found" });
    }
    res.status(200).json(vet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Book a vet session
export const bookVetSession = async (req, res) => {
  try {
    const { id } = req.params; // Vet ID
    const { date, time } = req.body;

    const vet = await Veterinarian.findById(id);
    if (!vet) {
      return res.status(404).json({ message: "Veterinarian not found" });
    }

    // Append booking information
    vet.appointments = vet.appointments || [];
    vet.appointments.push({ date, time });

    await vet.save();
    res.status(200).json({ message: "Vet session booked successfully!", vet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Rate a veterinarian
export const rateVet = async (req, res) => {
  try {
    const { id } = req.params; // Vet ID
    const { rating, comment } = req.body;

    const vet = await Veterinarian.findById(id);
    if (!vet) {
      return res.status(404).json({ message: "Veterinarian not found" });
    }

    // Add rating
    vet.ratings = vet.ratings || [];
    vet.ratings.push({ rating, comment });

    // Calculate average rating
    const totalRatings = vet.ratings.reduce((sum, r) => sum + r.rating, 0);
    vet.averageRating = totalRatings / vet.ratings.length;

    await vet.save();
    res.status(200).json({ message: "Rating submitted successfully!", vet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
