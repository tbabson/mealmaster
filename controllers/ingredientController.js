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
  const { id } = req.params; // Ingredient ID
  const { name, quantity, unit, substitutions, price, meal: newMealId } = req.body;

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
    ingredient.price = price || ingredient.price;
    ingredient.substitutions = substitutions || ingredient.substitutions;

    // Save the updated ingredient
    await ingredient.save();

    // Check if a new meal ID is provided
    if (newMealId) {
      // Remove the ingredient ID from its current meal's ingredients array
      if (ingredient.meal && ingredient.meal.toString() !== newMealId) {
        const previousMeal = await Meal.findById(ingredient.meal);
        if (previousMeal) {
          previousMeal.ingredients.pull(ingredient._id);
          await previousMeal.save();
        }
      }

      // Add the ingredient ID to the new meal's ingredients array
      const updatedMeal = await Meal.findByIdAndUpdate(
        newMealId,
        { $addToSet: { ingredients: ingredient._id } }, // Add only if not already present
        { new: true } // Return the updated meal
      );

      if (!updatedMeal) {
        throw new NotFoundError('New meal not found');
      }

      // Update the ingredient's `meal` field
      ingredient.meal = newMealId;
      await ingredient.save();

      // Optionally populate the updated meal's ingredients for the response
      const populatedMeal = await Meal.findById(newMealId).populate('ingredients');

      return res.status(StatusCodes.OK).json({ ingredient });
    }

    // Respond with the updated ingredient only if no new meal ID is provided
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

