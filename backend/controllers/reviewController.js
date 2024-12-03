import Review from "../models/review.js";

// Add a review
export const addReview = async (req, res) => {
  try {
    const reviewData = req.body;
    const newReview = new Review(reviewData);
    await newReview.save();
    res
      .status(201)
      .json({ message: "Review added successfully!", review: newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("author equipment");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
