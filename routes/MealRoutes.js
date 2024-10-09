import { Router } from "express";
const router = Router();
//import multer from "multer"; // Middleware to handle file uploads
import upload from "../middleware/multer.js";
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
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// // const upload = multer({ storage });

// const upload = multer({ dest: "uploads/" });



// Routes

router.post('/', upload.single("picture"), authenticateUser, authorizePermissions("admin"), createMeal)
// Create a meal with image upload

router.get("/meals", getAllMeals) // Get all meals

router.get("/:id", getMealById) // Get meal by ID

router.patch("/:id", upload.single("picture"), authenticateUser, authorizePermissions("admin"), updateMeal)// Update meal with image upload

router.delete("/:id", authenticateUser, authorizePermissions("admin"), deleteMeal) // Delete meal

export default router;
