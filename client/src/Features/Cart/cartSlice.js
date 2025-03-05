import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

const defaultState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 300,
    tax: 0,
    orderTotal: 0,
};

// Retrieve cart from cookies
const getCartFromCookies = () => {
    try {
        return JSON.parse(Cookies.get("cart") || JSON.stringify(defaultState));
    } catch (error) {
        console.error("Error parsing cart from cookies:", error);
        return defaultState;
    }
};

// Save cart to cookies
const saveCartToCookies = (state) => {
    Cookies.set("cart", JSON.stringify(state), { expires: 7 }); // Store for 7 days
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: getCartFromCookies(),
    reducers: {
        addItem: (state, action) => {
            const { meal } = action.payload;
            if (!meal || !meal.ingredients?.length) {
                toast.error("Meal or ingredients missing!");
                return;
            }

            let existingMeal = state.cartItems.find((i) => i.mealID === meal.mealID);

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
                state.cartItems.push({
                    mealID: meal._id || meal.mealID || `temp-${Date.now()}`, // Ensure unique ID
                    name: meal.name,
                    image: meal.image,
                    ingredients: meal.ingredients,
                });
            }

            // Update totals
            cartSlice.caseReducers.calculateTotals(state);
            saveCartToCookies(state);
            toast.success("Meal added to cart!");
        },


        clearCart: (state) => {
            Object.assign(state, defaultState);
            saveCartToCookies(state);
            toast.info("Cart cleared!");
        },

        removeIngredient: (state, action) => {
            const { mealID, ingredientName } = action.payload;
            let meal = state.cartItems.find((i) => i.mealID === mealID);

            if (!meal) {
                toast.error("Meal not found in cart!");
                return;
            }

            let ingredientIndex = meal.ingredients.findIndex((i) => i.name === ingredientName);
            if (ingredientIndex === -1) {
                toast.error("Ingredient not found in meal!");
                return;
            }

            const removedIngredient = meal.ingredients.splice(ingredientIndex, 1)[0];
            state.cartTotal -= removedIngredient.price * removedIngredient.quantity;
            state.numItemsInCart -= removedIngredient.quantity;

            if (!meal.ingredients.length) {
                state.cartItems = state.cartItems.filter((i) => i.mealID !== mealID);
            }

            cartSlice.caseReducers.calculateTotals(state);
            saveCartToCookies(state);
            toast.info(`${ingredientName} removed from cart`);
        },

        editItem: (state, action) => {
            const { mealID, ingredientName, newQuantity } = action.payload;
            let meal = state.cartItems.find((i) => i.mealID === mealID);
            if (!meal) return toast.error("Meal not found in cart!");

            let ingredient = meal.ingredients.find((i) => i.name === ingredientName);
            if (!ingredient) return toast.error("Ingredient not found in meal!");

            state.numItemsInCart += newQuantity - ingredient.quantity;
            state.cartTotal += ingredient.price * (newQuantity - ingredient.quantity);
            ingredient.quantity = newQuantity;

            cartSlice.caseReducers.calculateTotals(state);
            saveCartToCookies(state);
            toast.success(`${ingredientName} quantity updated`);
        },

        removeMeal: (state, action) => {
            const { mealID } = action.payload;
            let meal = state.cartItems.find((i) => i.mealID === mealID);
            if (!meal) return;

            state.cartTotal -= meal.ingredients.reduce((sum, i) => sum + i.price * i.quantity, 0);
            state.numItemsInCart -= meal.ingredients.length;
            state.cartItems = state.cartItems.filter((i) => i.mealID !== mealID);

            cartSlice.caseReducers.calculateTotals(state);
            saveCartToCookies(state);
            toast.info('Meal removed from cart');
        },

        calculateTotals: (state) => {
            state.cartTotal = state.cartItems.reduce((total, meal) =>
                total + meal.ingredients.reduce((mealSum, ingredient) =>
                    mealSum + ingredient.price * ingredient.quantity, 0
                ), 0
            );

            state.numItemsInCart = state.cartItems.reduce((total, meal) =>
                total + meal.ingredients.reduce((sum, ing) => sum + ing.quantity, 0), 0
            );

            state.tax = 0.1 * state.cartTotal;
            state.orderTotal = state.cartTotal + state.shipping + state.tax;

            saveCartToCookies(state);
        },
    },
});

export const { addItem, clearCart, removeIngredient, editItem, calculateTotals, removeMeal } = cartSlice.actions;
export default cartSlice.reducer;
