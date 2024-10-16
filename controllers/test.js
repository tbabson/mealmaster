import express from 'express';
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
} from '../controllers/orderController.js';
import {
  updateTrackingStatus,
  getTrackingUpdates,
} from '../controllers/deliveryController.js';

const router = express.Router();

// Order routes
router.post('/orders', placeOrder); // Place a new order
router.get('/orders', getUserOrders); // Get all user orders
router.get('/orders/:id', getOrderById); // Get order by ID
router.delete('/orders/:id', cancelOrder); // Cancel an order

// Delivery routes
router.put('/delivery/:id/tracking', updateTrackingStatus); // Update tracking status
router.get('/delivery/:id/tracking', getTrackingUpdates); // Get tracking updates

export default router;



{
  "items": [
    { "ingredient": "<ingredient_id_1>", "quantity": 3, "price": 5.00 },
    { "ingredient": "<ingredient_id_2>", "quantity": 2, "price": 10.00 }
  ],
  "totalAmount": 35.00,
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "Los Angeles",
    "state": "CA",
    "postalCode": "90001"
  },
  "deliveryTime": "2024-10-05T10:00:00Z"
}

//Update Tracking Status (PUT): /api/delivery/:id/tracking
{
  "status": "Out for Delivery"
}
