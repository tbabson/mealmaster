import Meal from '../models/MealModel.js';
import { StatusCodes } from 'http-status-codes';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

//REFACTORED MEAL CONTROLLERS
// export const createMeal = async (req, res) => {
//     // Set the createdBy field from the user information
//     req.body.createdBy = req.user.userId;

//     // Check if the image file is present
//     if (!req.file) {
//         return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please upload a meal image" });
//     }

//     // Upload image to Cloudinary
//     const result = await cloudinary.v2.uploader.upload(req.file.path, {
//         folder: 'mealmaster',
//         use_filename: true,
//     });

//     // Remove local file after upload
//     await fs.unlink(req.files.tempFilePath);

//     // Add Cloudinary URL and public ID to req.body
//     req.body.picture = result.secure_url;
//     req.body.cloudinaryId = result.public_id;

//     // Create the new food item in the database
//     const meal = await Meal.create(req.body);

//     // Respond with the created food
//     res.status(StatusCodes.CREATED).json({ meal });
// };

export const createMeal = async (req, res) => {
  try {
    const { name, mealType, ingredients, cuisine, preparationSteps } = req.body;

    // Check if the image file is present
    if (!req.file) {
      return res
        .status(StatusCodes.BAD_REQUEST) // Ensure the right status code is used here
        .json({ message: 'Please upload a meal image' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: 'mealmaster', // Cloudinary folder
      use_filename: true,
    });

    // Remove local file after upload
    await fs.unlink(req.file.path);

    // Create the new meal in the database
    const meal = await Meal.create({
      name,
      mealType,
      ingredients,
      cuisine,
      preparationSteps,
      picture: result.secure_url, // Use Cloudinary URL for the image
      cloudinaryId: result.public_id, // Save Cloudinary public ID
      createdBy: req.user.userId, // Ensure you're properly using user info
    });

    // Respond with the created meal
    res.status(StatusCodes.CREATED).json({ meal });
  } catch (error) {
    // Generic error handler
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// @desc    Get all meals
// @route   GET /api/meals
export const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find({});
    res.status(StatusCodes.OK).json({ meals, count: meals.length });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// @desc    Get meal by ID
// @route   GET /api/meals/:id
export const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate('ingredient');
    if (!meal) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Meal not found' });
    }
    res.status(StatusCodes.OK).json({ meal });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// @desc    Update meal
// @route   PUT /api/meals/:id
export const updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Meal not found' });
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// @desc    Delete meal
// @route   DELETE /api/meals/:id
export const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Meal not found' });
    }

    // Delete the image from Cloudinary
    await cloudinary.v2.uploader.destroy(meal.cloudinaryId);

    // Delete the meal from the database
    await meal.remove();

    res.status(StatusCodes.OK).json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
