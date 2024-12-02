import express from 'express';
import {
    placeOrder,
    getUserOrders,
    getOrderById,
    cancelOrder,
} from '../controllers/OrderController.js';
import { updateTrackingStatus, getTrackingUpdates } from '../controllers/DeliveryController.js';
import {
    authenticateUser,
    authorizePermissions,
} from '../middleware/authMiddleware.js';

const router = express.Router();

// Order routes
router.post('/', authenticateUser, placeOrder); // Place a new order
router.get('/', authenticateUser, getUserOrders); // Get all user orders
router.get('/:id', authenticateUser, getOrderById); // Get order by ID
router.delete('/:id', authenticateUser, cancelOrder); // Cancel an order

////DELIVERY ROUTES////

// Route to update tracking status
router.patch('/:id/delivery/tracking', authenticateUser, authorizePermissions('admin'), updateTrackingStatus);

router.get('/:id/delivery/tracking', authenticateUser, getTrackingUpdates); // Get tracking updates



export default router;

// initiate the shopping list such that it is created based on meal.ingredients and rewrite the shoppinglist schema and controller in accordance to the adjustment.
