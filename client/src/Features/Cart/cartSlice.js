import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import { logoutUser } from "../user/userSlice";

const initialState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 300,
    tax: 0,
    orderTotal: 0,
    loading: false,
    error: null,
    lastSyncedCart: [],
    // Admin state
    carts: [],
    totalCarts: 0,
    numOfPages: 1,
    page: 1,
    search: "",
    searchStatus: "all",
    sort: "latest",
};

// Fetch cart from backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId, { rejectWithValue }) => {
    if (!userId) return rejectWithValue("User ID is required");
    try {
        const response = await customFetch.get(`/cart/${userId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
});

// Sync cart with backend (debounced to prevent frequent calls)
const debouncedSyncCart = debounce(async ({ userId, cartItems, dispatch }) => {
    if (!userId) return;
    try {
        await customFetch.post("/cart/sync", { userId, cartItems });
        dispatch(setLastSyncedCart(cartItems));
    } catch (error) {
        toast.error(error.response?.data?.message || "No cart to sync");
    }
}, 1000);

export const syncCart = createAsyncThunk("cart/syncCart", async ({ userId, cartItems }, { dispatch }) => {
    debouncedSyncCart({ userId, cartItems, dispatch });
});

// Admin: Fetch all carts
export const fetchAllCarts = createAsyncThunk(
    "cart/fetchAllCarts",
    async ({ search, searchStatus, sort, page }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({
                search: search || "",
                status: searchStatus || "all",
                sort: sort || "latest",
                page: page || 1
            });

            const response = await customFetch.get(`/cart/admin/all?${params}`);
            return response.data;
        } catch (error) {
            return rejectWithValue("Failed to fetch carts");
        }
    }
);

// Admin: Update cart status
export const updateCartStatus = createAsyncThunk(
    "cart/updateCartStatus",
    async ({ cartId, status }, { rejectWithValue }) => {
        try {
            const response = await customFetch.patch(`/cart/admin/${cartId}/status`, { status });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update cart status");
        }
    }
);

// Admin: Delete cart
export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (cartId, { rejectWithValue }) => {
        try {
            await customFetch.delete(`/cart/admin/${cartId}`);
            return cartId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete cart");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { meal } = action.payload;
            if (!meal || !meal.ingredients?.length) {
                toast.error("Meal or ingredients missing!");
                return;
            }
            if (!Array.isArray(state.cartItems)) state.cartItems = [];

            let existingMeal = state.cartItems.find((i) => i.mealID === meal.mealID);
            if (existingMeal) {
                meal.ingredients.forEach((newIngredient) => {
                    const existingIngredient = existingMeal.ingredients.find(i => i.name === newIngredient.name);
                    if (existingIngredient) {
                        existingIngredient.quantity += newIngredient.quantity;
                    } else {
                        existingMeal.ingredients.push(newIngredient);
                    }
                });
            } else {
                state.cartItems.push({
                    mealID: meal._id || meal.mealID || `temp-${Date.now()}`,
                    name: meal.name,
                    image: meal.image,
                    ingredients: meal.ingredients,
                });
            }
            toast.success("Item added to cart");
            cartSlice.caseReducers.calculateTotals(state);
        },
        removeMeal: (state, action) => {
            state.cartItems = state.cartItems.filter((meal) => meal.mealID !== action.payload.mealID);
            toast.success("Meal removed from cart");
            cartSlice.caseReducers.calculateTotals(state);
        },
        clearCart: (state) => {
            Object.assign(state, initialState);
            toast.success("Cart cleared successfully");
        },
        removeIngredient: (state, action) => {
            const { mealID, ingredientName } = action.payload;
            let meal = state.cartItems.find((i) => i.mealID === mealID);
            if (!meal) return;
            meal.ingredients = meal.ingredients.filter((i) => i.name !== ingredientName);
            if (!meal.ingredients.length) {
                state.cartItems = state.cartItems.filter((i) => i.mealID !== mealID);
            }
            toast.success("Ingredient removed from meal");
            cartSlice.caseReducers.calculateTotals(state);
        },
        updateIngredientQuantity: (state, action) => {
            const { mealID, ingredientName, newQuantity } = action.payload;
            let meal = state.cartItems.find((i) => i.mealID === mealID);
            if (!meal) return;
            let ingredient = meal.ingredients.find((i) => i.name === ingredientName);
            if (!ingredient) return;
            ingredient.quantity = Math.max(0, newQuantity);
            if (ingredient.quantity === 0) {
                meal.ingredients = meal.ingredients.filter((i) => i.name !== ingredientName);
                if (!meal.ingredients.length) {
                    state.cartItems = state.cartItems.filter((i) => i.mealID !== mealID);
                }
            }
            toast.success("Ingredient quantity updated");
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
        setLastSyncedCart: (state, action) => {
            state.lastSyncedCart = action.payload;
        },
        // Admin reducers
        updateFilters: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
            // Reset page to 1 when filters change
            if (name !== 'page') {
                state.page = 1;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = Array.isArray(action.payload.cartItems) ? action.payload.cartItems : [];
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload || "Failed to load cart");
            })
            .addCase(logoutUser.fulfilled, (state) => {
                return initialState; // Reset the cart state when user logs out
            })
            // Admin: Fetch all carts
            .addCase(fetchAllCarts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllCarts.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.carts = payload.carts;
                state.totalCarts = payload.totalCarts;
                state.numOfPages = payload.numOfPages;
            })
            .addCase(fetchAllCarts.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload);
            })
            // Admin: Update cart status
            .addCase(updateCartStatus.fulfilled, (state, action) => {
                const updatedCart = action.payload;
                state.carts = state.carts.map(cart =>
                    cart._id === updatedCart._id ? updatedCart : cart
                );
                toast.success("Cart status updated");
            })
            .addCase(updateCartStatus.rejected, (state, action) => {
                toast.error(action.payload);
            })
            // Admin: Delete cart
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.carts = state.carts.filter(cart => cart._id !== action.payload);
                state.totalCarts--;
                toast.success("Cart deleted successfully");
            })
            .addCase(deleteCart.rejected, (state, action) => {
                toast.error(action.payload);
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
    setLastSyncedCart,
    updateFilters,
} = cartSlice.actions;
export default cartSlice.reducer;
