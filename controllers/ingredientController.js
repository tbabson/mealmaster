import Ingredient from '../models/IngredientsModel.js';
import { StatusCodes } from 'http-status-codes';

// @desc    Add a new ingredient
// @route   POST /api/ingredients
export const createIngredient = async (req, res) => {
    req.body.createdBy = req.user.userId
    const ingredient = await Ingredient.create(req.body)
    res.status(StatusCodes.CREATED).json({ ingredient })
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
        const ingredient = await Ingredient.findById(_id);
        if (!ingredient) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Ingredient not found' });
        }

        await ingredient.remove();
        res.status(StatusCodes.OK).json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};


