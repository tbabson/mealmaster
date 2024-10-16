import express from 'express';
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
} from '../controllers/OrderController.js';

import {
  updateTrackingStatus,
  getTrackingUpdates,
} from '../controllers/DeliveryController.js';

import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authMiddleware.js';

const router = express.Router();

// Order routes
router.post('/orders', authenticateUser, placeOrder); // Place a new order
router.get('/orders', authenticateUser, getUserOrders); // Get all user orders
router.get('/orders/:id', getOrderById); // Get order by ID
router.delete('/orders/:id', cancelOrder); // Cancel an order

/////DELIVERY ROUTES //////

// Delivery routes
router.put('/delivery/:id/tracking', updateTrackingStatus); // Update tracking status
router.get('/delivery/:id/tracking', getTrackingUpdates); // Get tracking updates

export default router;

// initiate the shopping list such that it is created based on meal.ingredients and rewrite the shoppinglist schema and controller in accordance to the adjustment.
