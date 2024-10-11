import ShoppingList from '../models/shoppingListModel.js';
import { StatusCodes } from 'http-status-codes';



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
