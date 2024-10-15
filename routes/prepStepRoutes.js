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
router.post('/preparationsteps', authenticateUser,
    authorizePermissions('admin'), createPreparationStep); // Create a new preparation step
router.get('/preparationsteps', authenticateUser,
    authorizePermissions('admin'), getPreparationSteps); // Get all preparation steps (with optional skill level filter)
router.get('/preparationsteps/:id', authenticateUser,
    authorizePermissions('admin'), getPreparationStepById); // Get a single preparation step by ID
router.patch('/preparationsteps/:id', authenticateUser,
    authorizePermissions('admin'), updatePreparationStep); // Update a preparation step
router.delete('/preparationsteps/:id', authenticateUser,
    authorizePermissions('admin'), deletePreparationStep); // Delete a preparation step

export default router;
