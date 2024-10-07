import { Router } from "express";
const router = Router();
import multer from "multer"; // Middleware to handle file uploads

import {
    createMeal,
    getAllMeals,
    getMealById,
    updateMeal,
    deleteMeal,
} from "../controllers/MealControllers.js";
import { authenticateUser, authorizePermissions } from "../middleware/authMiddleware.js";



// Multer setup for file uploads
// Configure multer to store files in the 'uploads/' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// const upload = multer({ dest: "uploads/" });



// Routes
router.route("/").post(upload.single("picture"), authenticateUser, authorizePermissions("admin"), createMeal); // Create a meal with image upload

router.route("/").get(getAllMeals); // Get all meals

router.route("/:id").get(getMealById); // Get meal by ID

router.route("/:id").put(upload.single("picture"), authenticateUser, authorizePermissions("admin"), updateMeal); // Update meal with image upload

router.route("/:id").delete(authenticateUser, authorizePermissions("admin"), deleteMeal); // Delete meal

export default router;
