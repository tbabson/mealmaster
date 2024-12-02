import express from 'express';
const router = express.Router();
import {
    createIngredient,
    getAllIngredients,
    getIngredientById,
    updateIngredient,
    deleteIngredient,
} from '../controllers/ingredientController.js';
import { authenticateUser, authorizePermissions } from "../middleware/authMiddleware.js";


// Ingredient routes
router.post('/', authenticateUser, authorizePermissions("admin"), createIngredient); // Add a new ingredient
router.get('/', getAllIngredients); // Get all ingredients
router.get('/:id', getIngredientById); // Get ingredient by ID
router.patch('/:id', authenticateUser, authorizePermissions("admin"), updateIngredient); // Update an ingredient
router.delete('/:id', authenticateUser, authorizePermissions("admin"), deleteIngredient); // Delete an ingredient



export default router;
