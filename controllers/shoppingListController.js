import { StatusCodes } from 'http-status-codes';
import ShoppingList from '../models/shoppingListModel.js'; // Assuming the path to your model
import Meal from '../models/MealModel.js'; // Assuming the path to your meal model
import { NotFoundError } from '../errors/customErrors.js'; // Custom error for handling missing resources



// @desc    Create a new shopping list based on meal ingredients
// @route   POST /api/shopping-lists
export const createShoppingList = async (req, res) => {
    const { meal: mealId, name } = req.body;
    const userId = req.user.userId; // Assuming user is authenticated


    try {
        // Find the meal to ensure it exists and retrieve its ingredients
        const meal = await Meal.findById(mealId).populate('ingredients');
        if (!meal) {
            throw new NotFoundError(`No meal with id : ${mealId}`);
        }

        // Create a shopping list using the meal's ingredients
        const shoppingList = await ShoppingList.create({
            name,
            ingredients: meal.ingredients.map(ingredient => ingredient._id), // Use meal ingredients
            meal: mealId,  // Link shopping list to the meal
            user: userId,
        });



        res.status(StatusCodes.CREATED).json({ shoppingList });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Get all shopping lists for a user
// @route   GET /api/shopping-lists
export const getUserShoppingLists = async (req, res) => {
    const userId = req.user.userId; // Assuming user is authenticated

    try {
        // Fetch all shopping lists for the user and populate ingredients and meal details
        const shoppingLists = await ShoppingList.find({ user: userId })

        res.status(StatusCodes.OK).json({ shoppingLists, count: shoppingLists.length });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};


// @desc    Delete a shopping list
// @route   DELETE /api/shopping-lists/:id
export const deleteShoppingList = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the shopping list by its ID
        const shoppingList = await ShoppingList.findById(id);
        if (!shoppingList) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Shopping list not found' });
        }

        await shoppingList.deleteOne();
        res.status(StatusCodes.OK).json({ message: 'Shopping list deleted successfully' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

