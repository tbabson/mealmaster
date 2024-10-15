import Ingredient from '../models/IngredientsModel.js';
import { StatusCodes } from 'http-status-codes';
import Meal from '../models/MealModel.js';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';

// @desc    Add a new ingredient
// @route   POST /api/ingredients

export const createIngredient = async (req, res) => {
  const { meal: mealId } = req.body;

  // Check if the meal exists
  const isValidMeal = await Meal.findById(mealId);
  if (!isValidMeal) {
    throw new NotFoundError(`No meal with id: ${mealId}`);
  }

  // Add createdBy to the request body
  req.body.createdBy = req.user.userId;

  // Create the ingredient
  const ingredient = await Ingredient.create(req.body);

  // Update the meal to include this ingredient's ID in the meal's ingredient list
  await Meal.findByIdAndUpdate(
    mealId,
    {
      $push: { ingredients: ingredient._id }, // Push the new ingredient ID to the ingredients array
    },
    { new: true, useFindAndModify: false }
  );

  // Respond with the created ingredient
  res.status(StatusCodes.CREATED).json({ ingredient });
};

// @desc    Get all ingredients
// @route   GET /api/ingredients
export const getAllIngredients = async (req, res) => {
  const ingredients = await Ingredient.find({});
  res.status(StatusCodes.OK).json({ ingredients, count: ingredients.length });
};

// @desc    Get an ingredient by ID
// @route   GET /api/ingredients/:id
export const getIngredientById = async (req, res) => {
  const { id } = req.params;

  try {
    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      throw new NotFoundError('Ingredient not found');
    }
    res.status(StatusCodes.OK).json({ ingredient });
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

// @desc    Update an ingredient
// @route   PUT /api/ingredients/:id
export const updateIngredient = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, unit, substitutions, meal } = req.body;

  try {
    // Find the ingredient by ID
    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      throw new NotFoundError('Ingredient not found');
    }

    // Update ingredient fields
    ingredient.name = name || ingredient.name;
    ingredient.quantity = quantity || ingredient.quantity;
    ingredient.unit = unit || ingredient.unit;
    ingredient.substitutions = substitutions || ingredient.substitutions;

    // Save the updated ingredient
    await ingredient.save();

    // Check if a meal ID is provided for updating the Meal document
    if (meal) {
      // Update the meal's ingredients to include the updated ingredient's ID
      const updatedMeal = await Meal.findByIdAndUpdate(
        meal, // The meal ID provided in the request
        { $addToSet: { ingredients: ingredient._id } }, // Use $addToSet to avoid duplicates
        { new: true } // Return the updated meal
      );

      if (!updatedMeal) {
        throw new NotFoundError('Meal not found');
      }

      // Optionally populate the updated meal's ingredients for the response
      const populatedMeal = await Meal.findById(updatedMeal._id)

      return res.status(StatusCodes.OK).json({ ingredient, meal: populatedMeal });
    }

    // Respond with the updated ingredient only if no meal ID is provided
    res.status(StatusCodes.OK).json({ ingredient });
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

// @desc    Delete an ingredient
// @route   DELETE /api/ingredients/:id
export const deleteIngredient = async (req, res) => {
  const { id } = req.params;

  try {
    const ingredient = await Ingredient.findById(_id);
    if (!ingredient) {
      throw new NotFoundError('ingredient not found');
    }

    await ingredient.remove();
    res
      .status(StatusCodes.OK)
      .json({ message: 'Ingredient deleted successfully' });
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

