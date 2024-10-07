import { Router } from "express";
const router = Router()
import { register, login, logout } from '../controllers/authController.js';

import rateLimiter from "express-rate-limit";


const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message: { msg: 'IP rate limit exceeded, retry in 15 minutes' },
})


router.post('/register', apiLimiter, register)

router.post('/login', apiLimiter, login)

router.get('/logout', logout)

// // Register a new user
// router.post('/auth/register', register);

// // Login an existing user
// router.post('/auth/login', login);

// // Logout user
// router.post('/auth/logout', logout);

export default router;
