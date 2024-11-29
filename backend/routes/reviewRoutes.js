import express from 'express';
import { addReview, getAllReviews } from '../controllers/reviewController.js';

const router = express.Router();

// Add a review
router.post('/', addReview);

// Get all reviews
router.get('/', getAllReviews);

export default router;
