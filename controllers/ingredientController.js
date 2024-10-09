import Ingredient from '../models/Ingredient.js';
import ShoppingList from '../models/ShoppingList.js';
import { StatusCodes } from 'http-status-codes';

// @desc    Add a new ingredient
// @route   POST /api/ingredients
export const addIngredient = async (req, res) => {
    const { name, quantity, unit, substitutions } = req.body;

    try {
        const ingredient = await Ingredient.create({
            name,
            quantity,
            unit,
            substitutions,
        });

        res.status(StatusCodes.CREATED).json({ ingredient });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Get all ingredients
// @route   GET /api/ingredients
export const getAllIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find({});
        res.status(StatusCodes.OK).json({ ingredients });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Get an ingredient by ID
// @route   GET /api/ingredients/:id
export const getIngredientById = async (req, res) => {
    const { id } = req.params;

    try {
        const ingredient = await Ingredient.findById(id);
        if (!ingredient) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Ingredient not found' });
        }
        res.status(StatusCodes.OK).json({ ingredient });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Update an ingredient
// @route   PUT /api/ingredients/:id
export const updateIngredient = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, unit, substitutions } = req.body;

    try {
        const ingredient = await Ingredient.findById(id);
        if (!ingredient) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Ingredient not found' });
        }

        ingredient.name = name || ingredient.name;
        ingredient.quantity = quantity || ingredient.quantity;
        ingredient.unit = unit || ingredient.unit;
        ingredient.substitutions = substitutions || ingredient.substitutions;

        await ingredient.save();
        res.status(StatusCodes.OK).json({ ingredient });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Delete an ingredient
// @route   DELETE /api/ingredients/:id
export const deleteIngredient = async (req, res) => {
    const { id } = req.params;

    try {
        const ingredient = await Ingredient.findById(id);
        if (!ingredient) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Ingredient not found' });
        }

        await ingredient.remove();
        res.status(StatusCodes.OK).json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Create a new shopping list
// @route   POST /api/shopping-lists
export const createShoppingList = async (req, res) => {
    const { name, ingredients } = req.body;
    const userId = req.user._id; // Assuming user is authenticated

    try {
        const shoppingList = await ShoppingList.create({
            name,
            ingredients,
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
    const userId = req.user._id; // Assuming user is authenticated

    try {
        const shoppingLists = await ShoppingList.find({ user: userId }).populate('ingredients');
        res.status(StatusCodes.OK).json({ shoppingLists });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Delete a shopping list
// @route   DELETE /api/shopping-lists/:id
export const deleteShoppingList = async (req, res) => {
    const { id } = req.params;

    try {
        const shoppingList = await ShoppingList.findById(id);
        if (!shoppingList) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Shopping list not found' });
        }

        await shoppingList.remove();
        res.status(StatusCodes.OK).json({ message: 'Shopping list deleted successfully' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
