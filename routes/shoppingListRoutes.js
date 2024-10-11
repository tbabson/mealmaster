import express from 'express';
import {
    createShoppingList,
    getUserShoppingLists,
    deleteShoppingList,
} from '../controllers/shoppingListController.js';

const router = express.Router();

// Shopping List routes
router.post('/shoppingLists', createShoppingList); // Create a new shopping list
router.get('/shoppingLists', getUserShoppingLists); // Get all shopping lists for a user
router.delete('/shoppingLists/:id', deleteShoppingList); // Delete a shopping list

export default router;