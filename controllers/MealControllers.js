import Meal from "../models/MealModel.js";
import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});



// @desc    Create new meal
// @route   POST /api/meals
export const createMeal = async (req, res) => {
    try {
        const { name, mealType, ingredients, cuisine, preparationSteps } = req.body;

        // Upload image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path);

        // Create the new meal
        const meal = await Meal.create({
            name,
            mealType,
            ingredients,
            cuisine,
            preparationSteps,
            picture: result.secure_url, // URL for the image
            cloudinaryId: result.public_id, // Save Cloudinary public ID
        });

        res.status(StatusCodes.CREATED).json({ meal });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Get all meals
// @route   GET /api/meals
export const getAllMeals = async (req, res) => {
    try {
        const meals = await Meal.find({});
        res.status(StatusCodes.OK).json({ meals });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Get meal by ID
// @route   GET /api/meals/:id
export const getMealById = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Meal not found" });
        }
        res.status(StatusCodes.OK).json({ meal });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Update meal
// @route   PUT /api/meals/:id
export const updateMeal = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Meal not found" });
        }

        // If a new image is uploaded, replace the old one in Cloudinary
        if (req.file) {
            await cloudinary.v2.uploader.destroy(meal.cloudinaryId); // Delete old image
            const result = await cloudinary.v2.uploader.upload(req.file.path); // Upload new image
            req.body.picture = result.secure_url;
            req.body.cloudinaryId = result.public_id;
        }

        const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(StatusCodes.OK).json({ updatedMeal });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Delete meal
// @route   DELETE /api/meals/:id
export const deleteMeal = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Meal not found" });
        }

        // Delete the image from Cloudinary
        await cloudinary.v2.uploader.destroy(meal.cloudinaryId);

        // Delete the meal from the database
        await meal.remove();

        res.status(StatusCodes.OK).json({ message: "Meal deleted successfully" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
