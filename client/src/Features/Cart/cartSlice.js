// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { redirect } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import customFetch from '../../utils/customFetch';

// // Async Thunks

// // Create a shopping list
// export const createShoppingList = createAsyncThunk(
//     'shoppingList/createShoppingList',
//     async (mealId, thunkAPI) => {
//         try {
//             const response = await customFetch.post('/shopping-lists', { meal: mealId });
//             return response.data.shoppingList;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data.message || 'Need to be logged in');
//         }
//     }
// );

// // Fetch user shopping lists
// export const fetchUserShoppingLists = createAsyncThunk(
//     'shoppingList/fetchUserShoppingLists',
//     async (_, thunkAPI) => {
//         try {
//             const response = await customFetch.get('/shopping-lists');
//             return response.data.shoppingLists;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to fetch shopping lists');
//         }
//     }
// );

// // Remove an ingredient from a shopping list
// export const removeIngredientFromList = createAsyncThunk(
//     'shoppingList/removeIngredientFromList',
//     async ({ listId, ingredientId }, thunkAPI) => {
//         try {
//             const response = await customFetch.patch(`/shopping-lists/${listId}/remove-ingredient/${ingredientId}`);
//             return response.data.shoppingList;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to remove ingredient');
//         }
//     }
// );

// // Delete a shopping list
// export const deleteShoppingList = createAsyncThunk(
//     'shoppingList/deleteShoppingList',
//     async (listId, thunkAPI) => {
//         try {
//             await customFetch.delete(`/shopping-lists/${listId}`);
//             return listId;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to delete shopping list');
//         }
//     }
// );

// // Checkout a shopping list
// export const checkoutShoppingList = createAsyncThunk(
//     'shoppingList/checkoutShoppingList',
//     async (listId, thunkAPI) => {
//         try {
//             const response = await customFetch.patch(`/shopping-lists/${listId}/checkout`);
//             return response.data.shoppingList;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to checkout');
//         }
//     }
// );

// // Slice
// const shoppingListSlice = createSlice({
//     name: 'shoppingList',
//     initialState: {
//         shoppingLists: [],
//         isLoading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // Create Shopping List
//             .addCase(createShoppingList.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(createShoppingList.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.shoppingLists.push(action.payload);
//                 toast.success('Shopping list created successfully');
//             })
//             .addCase(createShoppingList.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload;
//                 toast.error(action.payload);
//             })

//             // Fetch User Shopping Lists
//             .addCase(fetchUserShoppingLists.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(fetchUserShoppingLists.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.shoppingLists = action.payload;
//             })
//             .addCase(fetchUserShoppingLists.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload;
//                 toast.error(action.payload);
//             })

//             // Remove Ingredient from Shopping List
//             .addCase(removeIngredientFromList.fulfilled, (state, action) => {
//                 const updatedList = action.payload;
//                 state.shoppingLists = state.shoppingLists.map((list) =>
//                     list._id === updatedList._id ? updatedList : list
//                 );
//                 toast.success('Ingredient removed successfully');
//             })

//             // Delete Shopping List
//             .addCase(deleteShoppingList.fulfilled, (state, action) => {
//                 state.shoppingLists = state.shoppingLists.filter((list) => list._id !== action.payload);
//                 toast.success('Shopping list deleted successfully');
//             })

//             // Checkout Shopping List
//             .addCase(checkoutShoppingList.fulfilled, (state, action) => {
//                 const updatedList = action.payload;
//                 state.shoppingLists = state.shoppingLists.map((list) =>
//                     list._id === updatedList._id ? updatedList : list
//                 );
//                 toast.success('Checked out successfully');
//             });
//     },
// });

// export default shoppingListSlice.reducer;


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
    const cartData = Cookies.get("cart");
    return cartData ? JSON.parse(cartData) : defaultState;
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: getCartFromCookies(),
    reducers: {
        addItem: (state, action) => {
            const { meal } = action.payload;
            // console.log(action.payload);
            if (!meal || !meal.ingredients || meal.ingredients.length === 0) {
                toast.error("Meal or ingredients missing!");
                return;
            }

            const existingMeal = state.cartItems.find((i) => i.mealID === meal._id);

            if (existingMeal) {
                // Update ingredient quantities if meal already exists in the cart
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
                // Add new meal to the cart
                state.cartItems.push(meal);
            }

            // Update cart totals based on ingredients
            meal.ingredients.forEach((ingredient) => {
                state.cartTotal += ingredient.price * ingredient.quantity;
                state.numItemsInCart += ingredient.quantity;
            });

            cartSlice.caseReducers.calculateTotals(state);
            toast.success("Meal added to cart!");

        },
        clearCart: (state) => {
            Cookies.set("cart", JSON.stringify(defaultState)); // Fix: Use cookies instead of localStorage
            return defaultState;
        },
        removeIngredient: (state, action) => {
            const { mealID, ingredientName } = action.payload;

            const meal = state.cartItems.find((i) => i.mealID === mealID);

            if (!meal) {
                toast.error("Meal not found in cart!");
                return;
            }

            const ingredientIndex = meal.ingredients.findIndex((i) => i.name === ingredientName);

            if (ingredientIndex === -1) {
                toast.error("Ingredient not found in meal!");
                return;
            }

            const removedIngredient = meal.ingredients[ingredientIndex];

            // Update cart totals before removing ingredient
            state.cartTotal -= removedIngredient.price * removedIngredient.quantity;
            state.numItemsInCart -= removedIngredient.quantity;

            // Remove ingredient from meal
            meal.ingredients.splice(ingredientIndex, 1);

            // If meal has no more ingredients, remove the meal itself
            if (meal.ingredients.length === 0) {
                state.cartItems = state.cartItems.filter((i) => i.mealID !== mealID);
            }

            cartSlice.caseReducers.calculateTotals(state);
            toast.error(`${ingredientName} removed from cart`);
        },
        editItem: (state, action) => {
            const { mealID, ingredientName, newQuantity } = action.payload;

            const meal = state.cartItems.find((i) => i.mealID === mealID);

            if (!meal) {
                toast.error("Meal not found in cart!");
                return;
            }

            const ingredient = meal.ingredients.find((i) => i.name === ingredientName);

            if (!ingredient) {
                toast.error("Ingredient not found in meal!");
                return;
            }

            // Update cart totals before modifying ingredient quantity
            state.numItemsInCart += newQuantity - ingredient.quantity;
            state.cartTotal += ingredient.price * (newQuantity - ingredient.quantity);

            // Update ingredient quantity
            ingredient.quantity = newQuantity;

            cartSlice.caseReducers.calculateTotals(state);
            toast.success(`${ingredientName} quantity updated in cart`);
        },
        calculateTotals: (state) => {
            state.cartTotal = state.cartItems.reduce((total, meal) => {
                const mealTotal = meal.ingredients.reduce((mealSum, ingredient) => {
                    return mealSum + ingredient.price * ingredient.quantity;
                }, 0);
                return total + mealTotal;
            }, 0);

            state.tax = 0.1 * state.cartTotal;
            state.orderTotal = state.cartTotal + state.shipping + state.tax;

            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeMeal: (state, action) => {
            const { mealID } = action.payload;
            const meal = state.cartItems.find((i) => i.mealID === mealID);

            if (!meal) return; // If meal is not found, do nothing

            // Calculate the total cost of the meal being removed
            const mealTotal = meal.ingredients.reduce((sum, ingredient) => {
                return sum + ingredient.price * ingredient.quantity;
            }, 0);

            // Remove the meal from the cart
            state.cartItems = state.cartItems.filter((i) => i.mealID !== mealID);

            // Update cart totals
            state.numItemsInCart -= 1; // Decrease meal count
            state.cartTotal -= mealTotal; // Deduct meal total
            cartSlice.caseReducers.calculateTotals(state); // Recalculate totals

            toast.error('Meal removed from cart');
        }
    },
});

export const { addItem, clearCart, removeIngredient, editItem, calculateTotals, removeMeal } = cartSlice.actions;

export default cartSlice.reducer;

