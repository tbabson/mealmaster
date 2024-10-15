import express from 'express';
import { placeOrder, getUserOrders, getOrderById, cancelOrder } from '../controllers/OrderController.js';


const router = express.Router();

// Order routes
router.post('/orders', placeOrder); // Place a new order
router.get('/orders', getUserOrders); // Get all user orders
router.get('/orders/:id', getOrderById); // Get order by ID
router.delete('/orders/:id', cancelOrder); // Cancel an order


export default router;



// initiate the shopping list such that it is created based on meal.ingredients and rewrite the shoppinglist schema and controller in accordance to the adjustment.