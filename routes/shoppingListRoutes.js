import express from 'express';
const router = express.Router();
import { authenticateUser } from "../middleware/authMiddleware.js";

import {
    createShoppingList,
    getUserShoppingLists,
    deleteShoppingList,
} from '../controllers/shoppingListController.js';


// Shopping List routes
router.post('/', authenticateUser, createShoppingList); // Create a new shopping list
router.get('/', authenticateUser, getUserShoppingLists); // Get all shopping lists for a user
router.delete('/:id', authenticateUser, deleteShoppingList); // Delete a shopping list

export default router;