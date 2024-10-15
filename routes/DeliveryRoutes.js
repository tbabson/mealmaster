import express from 'express';
import { updateTrackingStatus, getTrackingUpdates } from '../controllers/DeliveryController';

const router = express.Router();


// Delivery routes
router.put('/delivery/:id/tracking', updateTrackingStatus); // Update tracking status
router.get('/delivery/:id/tracking', getTrackingUpdates); // Get tracking updates

export default router;
