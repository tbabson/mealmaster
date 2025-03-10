// import Cart from '../models/CartModel.js'
// import { StatusCodes } from "http-status-codes";
// import { NotFoundError } from "../errors/customErrors.js";

// // ✅ Fetch Cart for Logged-in User
// export const getCart = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         let cart = await Cart.findOne({ userId });

//         if (!cart) {
//             cart = new Cart({ userId, cartItems: [] });
//             await cart.save();
//         }

//         res.status(StatusCodes.OK).json(cart);
//     } catch (error) {
//         console.error("Error fetching cart:", error);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error fetching cart." });
//     }
// };

// // ✅ Update Cart (Add Item)
// export const addToCart = async (req, res) => {
//     try {
//         const { userId, meal } = req.body;
//         let cart = await Cart.findOne({ userId });

//         if (!cart) {
//             cart = new Cart({ userId, cartItems: [] });
//         }

//         const existingMeal = cart.cartItems.find((item) => item.mealID === meal.mealID);

//         if (existingMeal) {
//             meal.ingredients.forEach((newIngredient) => {
//                 const existingIngredient = existingMeal.ingredients.find((i) => i.name === newIngredient.name);
//                 if (existingIngredient) {
//                     existingIngredient.quantity += newIngredient.quantity;
//                 } else {
//                     existingMeal.ingredients.push(newIngredient);
//                 }
//             });
//         } else {
//             cart.cartItems.push(meal);
//         }

//         await cart.save();
//         res.status(StatusCodes.OK).json(cart);
//     } catch (error) {
//         console.error("Error adding to cart:", error);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to add item to cart." });
//     }
// };

// // ✅ Remove Meal from Cart
// export const removeMeal = async (req, res) => {
//     try {
//         const { userId, mealID } = req.params; // Get data from URL
//         const cart = await Cart.findOne({ userId });

//         if (!cart) return res.status(StatusCodes.NOT_FOUND).json({ message: "Cart not found." });

//         cart.cartItems = cart.cartItems.filter((meal) => meal.mealID !== mealID);
//         await cart.save();

//         res.status(StatusCodes.OK).json(cart);
//     } catch (error) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to remove meal." });
//     }
// };

// // ✅ Clear Cart
// export const clearCart = async (req, res) => {
//     try {
//         const { userId } = req.params; // Get userId from URL params
//         const cart = await Cart.findOne({ userId });

//         if (!cart) return res.status(StatusCodes.NOT_FOUND).json({ message: "Cart not found." });

//         cart.cartItems = [];
//         await cart.save();

//         res.status(StatusCodes.OK).json(cart);
//     } catch (error) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to clear cart." });
//     }
// };

import Cart from '../models/CartModel.js';
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

// ✅ Fetch Cart for Logged-in User
export const getCart = async (req, res) => {
    try {
        console.log("getCart called with params:", req.params);
        const { userId } = req.params;

        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User ID is required"
            });
        }

        let cart = await Cart.findOne({ userId });
        console.log("Cart found:", cart ? "Yes" : "No");

        if (!cart) {
            cart = new Cart({ userId, cartItems: [] });
            await cart.save();
        }

        res.status(StatusCodes.OK).json(cart);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Server error fetching cart.",
            error: error.message
        });
    }
};

// ✅ Sync entire cart with backend - NEW
export const syncCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;

        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User ID is required"
            });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, cartItems });
        } else {
            cart.cartItems = cartItems;
        }

        await cart.save();
        res.status(StatusCodes.OK).json(cart);
    } catch (error) {
        console.error("Error syncing cart:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to sync cart.",
            error: error.message
        });
    }
};

// ✅ Add single meal to cart (kept for backward compatibility)
export const addToCart = async (req, res) => {
    try {
        const { userId, meal } = req.body;

        if (!userId || !meal) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User ID and meal are required"
            });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, cartItems: [] });
        }

        const existingMeal = cart.cartItems.find((item) => item.mealID === meal.mealID);
        if (existingMeal) {
            meal.ingredients.forEach((newIngredient) => {
                const existingIngredient = existingMeal.ingredients.find(
                    (i) => i.name === newIngredient.name
                );
                if (existingIngredient) {
                    existingIngredient.quantity += newIngredient.quantity;
                } else {
                    existingMeal.ingredients.push(newIngredient);
                }
            });
        } else {
            cart.cartItems.push(meal);
        }

        await cart.save();
        res.status(StatusCodes.OK).json(cart);
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to add item to cart." });
    }
};

// ✅ Remove Meal from Cart
export const removeMeal = async (req, res) => {
    try {
        const { userId, mealID } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(StatusCodes.NOT_FOUND).json({
            message: "Cart not found."
        });

        cart.cartItems = cart.cartItems.filter((meal) => meal.mealID !== mealID);
        await cart.save();
        res.status(StatusCodes.OK).json(cart);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to remove meal."
        });
    }
};

// ✅ Remove Ingredient from Meal - NEW
export const removeIngredient = async (req, res) => {
    try {
        const { userId, mealID, ingredientName } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(StatusCodes.NOT_FOUND).json({
            message: "Cart not found."
        });

        const meal = cart.cartItems.find(item => item.mealID === mealID);
        if (!meal) return res.status(StatusCodes.NOT_FOUND).json({
            message: "Meal not found in cart."
        });

        meal.ingredients = meal.ingredients.filter(i => i.name !== ingredientName);

        // If meal has no ingredients left, remove it entirely
        if (meal.ingredients.length === 0) {
            cart.cartItems = cart.cartItems.filter(item => item.mealID !== mealID);
        }

        await cart.save();
        res.status(StatusCodes.OK).json(cart);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to remove ingredient."
        });
    }
};

// ✅ Update Ingredient Quantity - NEW
export const updateIngredientQuantity = async (req, res) => {
    try {
        const { userId, mealID } = req.params;
        const { ingredientName, newQuantity } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(StatusCodes.NOT_FOUND).json({
            message: "Cart not found."
        });

        const meal = cart.cartItems.find(item => item.mealID === mealID);
        if (!meal) return res.status(StatusCodes.NOT_FOUND).json({
            message: "Meal not found in cart."
        });

        const ingredient = meal.ingredients.find(i => i.name === ingredientName);
        if (!ingredient) return res.status(StatusCodes.NOT_FOUND).json({
            message: "Ingredient not found in meal."
        });

        if (newQuantity <= 0) {
            // Remove ingredient if quantity is zero or less
            meal.ingredients = meal.ingredients.filter(i => i.name !== ingredientName);

            // If meal has no ingredients left, remove it entirely
            if (meal.ingredients.length === 0) {
                cart.cartItems = cart.cartItems.filter(item => item.mealID !== mealID);
            }
        } else {
            ingredient.quantity = newQuantity;
        }

        await cart.save();
        res.status(StatusCodes.OK).json(cart);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to update ingredient quantity."
        });
    }
};

// ✅ Clear Cart
export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(StatusCodes.NOT_FOUND).json({
            message: "Cart not found."
        });

        cart.cartItems = [];
        await cart.save();
        res.status(StatusCodes.OK).json(cart);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to clear cart."
        });
    }
};