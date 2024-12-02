import express from 'express';
const router = express.Router();
import {
    createPreparationStep,
    getPreparationSteps,
    getPreparationStepById,
    updatePreparationStep,
    deletePreparationStep,
} from '../controllers/PrepStepController.js';
import {
    authenticateUser,
    authorizePermissions,
} from '../middleware/authMiddleware.js';


// Routes
router.post('/preparationSteps', authenticateUser,
    authorizePermissions('admin'), createPreparationStep); // Create a new preparation step
router.get('/', authenticateUser,
    authorizePermissions('admin'), getPreparationSteps); // Get all preparation steps (with optional skill level filter)
router.get('/:id', authenticateUser,
    authorizePermissions('admin'), getPreparationStepById); // Get a single preparation step by ID
router.patch('/:id', authenticateUser,
    authorizePermissions('admin'), updatePreparationStep); // Update a preparation step
router.delete('/:id', authenticateUser,
    authorizePermissions('admin'), deletePreparationStep); // Delete a preparation step

export default router;
