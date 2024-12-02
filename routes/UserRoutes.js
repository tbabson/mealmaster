import { Router } from "express";
const router = Router()

import { getAllUsers, getUser, showCurrentUser, updateUser, changeUserPassword, deleteUser } from "../controllers/UserController.js";

import { authenticateUser, authorizePermissions } from "../middleware/authMiddleware.js";
//import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
//import { validateUserPasswordChange } from "../middleware/validationMiddleware.js";


router.patch('/changeUserPassword', authenticateUser, changeUserPassword);
router.get('/', authenticateUser, authorizePermissions('admin'), getAllUsers);
router.get('/currentUser', authenticateUser, showCurrentUser);
router.get('/:id', authenticateUser, authorizePermissions("admin"), getUser);
router.delete('/:id', authenticateUser, authorizePermissions("admin"), deleteUser);
router.patch('/:id', authenticateUser, updateUser)


//validateUpdateUserInput,
// router.route('/changeUserPassword').patch(authenticateUser, validateUserPasswordChange, changeUserPassword);
// router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers)
//router.route('/currentUser').get(showCurrentUser)
// router.route('/:id').get(authenticateUser, authorizePermissions("admin"), getUser).patch(authenticateUser, validateUpdateUserInput, updateUser).delete(authenticateUser, authorizePermissions("admin"), deleteUser)

export default router
