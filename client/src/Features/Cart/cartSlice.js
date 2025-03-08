// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import customFetch from "../../utils/customFetch";
// import { toast } from "react-toastify";

// const defaultState = {
//     cartItems: [],
//     numItemsInCart: 0,
//     cartTotal: 0,
//     shipping: 300,
//     tax: 0,
//     orderTotal: 0,
//     loading: false,
//     error: null,
// };

// // ✅ Fetch cart from backend when user logs in
// export const fetchCart = createAsyncThunk("cart/fetchCart", async (userID, { rejectWithValue }) => {
//     try {
//         const response = await customFetch.get(`/cart/${userID}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching cart:", error);
//         return rejectWithValue(error.response?.data || "Failed to fetch cart");
//     }
// });

// // ✅ Sync cart with backend
// export const syncCart = createAsyncThunk("cart/syncCart", async ({ userID, cartItems }, { rejectWithValue }) => {
//     if (!userID) return;
//     try {
//         await customFetch.post(`/cart/add`, { userID, cartItems });
//     } catch (error) {
//         console.error("Error updating cart:", error);
//         return rejectWithValue(error.response?.data || "Failed to sync cart");
//     }
// });

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: defaultState,
//     reducers: {
//         addItem: (state, action) => {
//             const { meal } = action.payload;

//             if (!meal || !meal.ingredients?.length) {
//                 toast.error("Meal or ingredients missing!");
//                 return;
//             }

//             let existingMeal = state.cartItems.find((i) => i.mealID === meal.mealID);

//             if (existingMeal) {
//                 meal.ingredients.forEach((newIngredient) => {
//                     const existingIngredient = existingMeal.ingredients.find(
//                         (i) => i.name === newIngredient.name
//                     );
//                     if (existingIngredient) {
//                         existingIngredient.quantity += newIngredient.quantity;
//                     } else {
//                         existingMeal.ingredients.push(newIngredient);
//                     }
//                 });
//                 toast.success(`meal added to cart!`);
//             } else {
//                 state.cartItems.push({
//                     mealID: meal._id || meal.mealID || `temp-${Date.now()}`,
//                     name: meal.name,
//                     image: meal.image,
//                     ingredients: meal.ingredients,
//                 });

//                 toast.success(`meal added to cart!`);
//             }

//             cartSlice.caseReducers.calculateTotals(state);
//         },

//         removeMeal: (state, action) => {
//             const { mealID } = action.payload;
//             state.cartItems = state.cartItems.filter((meal) => meal.mealID !== mealID);
//             cartSlice.caseReducers.calculateTotals(state);
//         },

//         clearCart: (state) => {
//             Object.assign(state, defaultState);
//         },

//         removeIngredient: (state, action) => {
//             const { mealID, ingredientName } = action.payload;
//             let meal = state.cartItems.find((i) => i.mealID === mealID);
//             if (!meal) return;

//             meal.ingredients = meal.ingredients.filter((i) => i.name !== ingredientName);
//             if (!meal.ingredients.length) {
//                 state.cartItems = state.cartItems.filter((i) => i.mealID !== mealID);
//             }
//             cartSlice.caseReducers.calculateTotals(state);
//         },

//         updateIngredientQuantity: (state, action) => {
//             const { mealID, ingredientName, newQuantity } = action.payload;
//             let meal = state.cartItems.find((i) => i.mealID === mealID);
//             if (!meal) return;

//             let ingredient = meal.ingredients.find((i) => i.name === ingredientName);
//             if (!ingredient) return;

//             if (newQuantity <= 0) {
//                 meal.ingredients = meal.ingredients.filter((i) => i.name !== ingredientName);
//                 if (!meal.ingredients.length) {
//                     state.cartItems = state.cartItems.filter((i) => i.mealID !== mealID);
//                 }
//             } else {
//                 ingredient.quantity = newQuantity;
//             }

//             cartSlice.caseReducers.calculateTotals(state);
//         },

//         calculateTotals: (state) => {
//             state.cartTotal = state.cartItems.reduce((total, meal) =>
//                 total + meal.ingredients.reduce((mealSum, ingredient) =>
//                     mealSum + ingredient.price * ingredient.quantity, 0
//                 ), 0
//             );

//             state.numItemsInCart = state.cartItems.reduce((total, meal) =>
//                 total + meal.ingredients.reduce((sum, ing) => sum + ing.quantity, 0), 0
//             );

//             state.tax = 0.1 * state.cartTotal;
//             state.orderTotal = state.cartTotal + state.shipping + state.tax;
//         },
//     },

//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchCart.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchCart.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.cartItems = action.payload.cartItems || [];
//                 cartSlice.caseReducers.calculateTotals(state);
//             })
//             .addCase(fetchCart.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(syncCart.rejected, (state, action) => {
//                 toast.error(action.payload || "Failed to sync cart");
//             });
//     },
// });

// export const {
//     addItem,
//     removeMeal,
//     clearCart,
//     removeIngredient,
//     updateIngredientQuantity,
//     calculateTotals,
// } = cartSlice.actions;
// export default cartSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

const defaultState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 300,
    tax: 0,
    orderTotal: 0,
    loading: false,
    error: null,
};

// ✅ Fetch cart from backend when user logs in
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userID, { rejectWithValue }) => {
    try {
        const response = await customFetch.get(`/cart/${userID}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        return rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
});

// ✅ Sync cart with backend - UPDATED
export const syncCart = createAsyncThunk(
    "cart/syncCart",
    async ({ userID, cartItems }, { rejectWithValue }) => {
        if (!userID) {
            return rejectWithValue("User ID is required");
        }

        try {
            // Changed endpoint to match new backend route
            const response = await customFetch.post(`/cart/sync`, {
                userId: userID, // Send userId to match backend expectation
                cartItems
            });
            return response.data;
        } catch (error) {
            console.error("Error updating cart:", error);
            return rejectWithValue(error.response?.data?.message || "Failed to sync cart");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: defaultState,
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
                toast.success(`Meal added to cart!`);
            } else {
                state.cartItems.push({
                    mealID: meal._id || meal.mealID || `temp-${Date.now()}`,
                    name: meal.name,
                    image: meal.image,
                    ingredients: meal.ingredients,
                });

                toast.success(`Meal added to cart!`);
            }

            cartSlice.caseReducers.calculateTotals(state);
        },

        // Rest of the reducers remain the same...
        removeMeal: (state, action) => {
            const { mealID } = action.payload;
            state.cartItems = state.cartItems.filter((meal) => meal.mealID !== mealID);
            cartSlice.caseReducers.calculateTotals(state);
        },

        clearCart: (state) => {
            Object.assign(state, defaultState);
        },

        removeIngredient: (state, action) => {
            const { mealID, ingredientName } = action.payload;
            let meal = state.cartItems.find((i) => i.mealID === mealID);
            if (!meal) return;

            meal.ingredients = meal.ingredients.filter((i) => i.name !== ingredientName);
            if (!meal.ingredients.length) {
                state.cartItems = state.cartItems.filter((i) => i.mealID !== mealID);
            }
            cartSlice.caseReducers.calculateTotals(state);
        },

        updateIngredientQuantity: (state, action) => {
            const { mealID, ingredientName, newQuantity } = action.payload;
            let meal = state.cartItems.find((i) => i.mealID === mealID);
            if (!meal) return;

            let ingredient = meal.ingredients.find((i) => i.name === ingredientName);
            if (!ingredient) return;

            if (newQuantity <= 0) {
                meal.ingredients = meal.ingredients.filter((i) => i.name !== ingredientName);
                if (!meal.ingredients.length) {
                    state.cartItems = state.cartItems.filter((i) => i.mealID !== mealID);
                }
            } else {
                ingredient.quantity = newQuantity;
            }

            cartSlice.caseReducers.calculateTotals(state);
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
        },

        // Add a sync trigger action
        triggerSync: () => {
            // This is just a trigger action, no state changes needed
        }
    },

    extraReducers: (builder) => {
        builder
            // Fetch cart cases
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload.cartItems || [];
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload || "Failed to load cart");
            })

            // Sync cart cases
            .addCase(syncCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(syncCart.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally update from server response if needed
                if (action.payload?.cartItems) {
                    state.cartItems = action.payload.cartItems;
                    cartSlice.caseReducers.calculateTotals(state);
                }
                // toast.success("Cart synchronized");
            })
            .addCase(syncCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload || "Failed to sync cart");
            });
    },
});

export const {
    addItem,
    removeMeal,
    clearCart,
    removeIngredient,
    updateIngredientQuantity,
    calculateTotals,
    triggerSync,
} = cartSlice.actions;
export default cartSlice.reducer;