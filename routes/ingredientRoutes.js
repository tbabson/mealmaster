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
router.post('/ingredients', authenticateUser, authorizePermissions("admin"), createIngredient); // Add a new ingredient
router.get('/ingredients', getAllIngredients); // Get all ingredients
router.get('/ingredients/:id', getIngredientById); // Get ingredient by ID
router.patch('/ingredients/:id', authenticateUser, authorizePermissions("admin"), updateIngredient); // Update an ingredient
router.delete('/ingredients/:id', authenticateUser, authorizePermissions("admin"), deleteIngredient); // Delete an ingredient



export default router;
