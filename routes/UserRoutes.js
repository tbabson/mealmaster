import express from 'express';
import { getAllUsers, getUser, updateUser, deleteUser, showCurrentUser, changeUserPassword } from '../controllers/UserController.js';
import { validateUserUpdate } from '../middleware/validationMiddleware.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.route('/').get(authenticateUser, getAllUsers);
router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/changeUserPassword').patch(authenticateUser, changeUserPassword);
router.route('/:id')
    .get(authenticateUser, getUser)
    .patch(authenticateUser, validateUserUpdate, upload.single('profileImage'), updateUser)
    .delete(authenticateUser, deleteUser);

export default router;
