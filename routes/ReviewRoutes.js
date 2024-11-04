import { Router } from "express";
const router = Router()

import { createReview, getAllReviews, getSingleReview, updateReview, deleteReview } from "../controllers/ReviewController.js";


import { authenticateUser } from "../middleware/authMiddleware.js";


router.post('/reviews', authenticateUser, createReview)
router.get('/reviews', authenticateUser, getAllReviews);

router.get('/reviews/:id', authenticateUser, getSingleReview)
router.patch('/reviews/:id', authenticateUser, updateReview)
router.delete('/reviews/:id', authenticateUser, deleteReview)


export default router

