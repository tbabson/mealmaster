import express from 'express';
import {
    addIngredient,
    getAllIngredients,
    getIngredientById,
    updateIngredient,
    deleteIngredient,
    createShoppingList,
    getUserShoppingLists,
    deleteShoppingList,
} from '../controllers/ingredientController.js';

const router = express.Router();

// Ingredient routes
router.post('/ingredients', addIngredient); // Add a new ingredient
router.get('/ingredients', getAllIngredients); // Get all ingredients
router.get('/ingredients/:id', getIngredientById); // Get ingredient by ID
router.put('/ingredients/:id', updateIngredient); // Update an ingredient
router.delete('/ingredients/:id', deleteIngredient); // Delete an ingredient

// Shopping List routes
router.post('/shopping-lists', createShoppingList); // Create a new shopping list
router.get('/shopping-lists', getUserShoppingLists); // Get all shopping lists for a user
router.delete('/shopping-lists/:id', deleteShoppingList); // Delete a shopping list

export default router;
