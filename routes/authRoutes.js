import express from 'express';
import { register, login, logout } from '../controllers/authController.js';

const router = express.Router();

// Register a new user
router.post('/auth/register', register);

// Login an existing user
router.post('/auth/login', login);

// Logout user
router.post('/auth/logout', logout);

export default router;
