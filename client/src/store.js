import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { syncCart } from './Features/Cart/cartSlice';
import userReducer from './Features/user/userSlice';
import reminderSliceReducer from './Features/Reminder/reminderSlice';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Create a transform to safely serialize and deserialize the cart items
const CartTransform = createTransform(
    // transform state on its way to being serialized and persisted
    (inboundState) => {
        // Create a safe-to-serialize copy of the state
        return {
            ...inboundState,
            // Add a check to ensure cartItems exists before mapping
            cartItems: inboundState.cartItems?.map(meal => ({
                mealID: meal.mealID,
                name: meal.name,
                image: meal.image,
                ingredients: meal.ingredients?.map(ingredient => ({
                    name: ingredient.name,
                    quantity: ingredient.quantity,
                    price: ingredient.price,
                    unit: ingredient.unit
                })) || []
            })) || []
        };
    },
    // transform state being rehydrated
    (outboundState) => {
        // Return the state as is when rehydrating
        return outboundState;
    },
    // only apply this transform to cartItems
    { whitelist: ['cartItems'] }
);

// Configure persistence for cart
const cartPersistConfig = {
    key: 'cart',
    storage,
    whitelist: ['cartItems', 'numItemsInCart', 'cartTotal', 'shipping', 'tax', 'orderTotal'],
    transforms: [CartTransform]
};

// Create the persisted reducer
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Cart sync middleware
const cartSyncMiddleware = store => next => action => {
    // First let the action go through the reducers
    const result = next(action);

    // Actions that should trigger a sync
    const syncActions = [
        'cart/addItem',
        'cart/removeMeal',
        'cart/clearCart',
        'cart/removeIngredient',
        'cart/updateIngredientQuantity',
        'cart/triggerSync'
    ];

    if (syncActions.includes(action.type)) {
        const { cart, user } = store.getState();
        // Only sync if user is logged in
        if (user?.user?._id) {
            store.dispatch(syncCart({
                userId: user.user._id,
                cartItems: cart.cartItems
            }));
        }
    }
    return result;
};

// Configure the store with the persisted reducer
const store = configureStore({
    reducer: {
        cart: persistedCartReducer, // Use the persisted reducer for cart
        user: userReducer,
        reminders: reminderSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types (needed for redux-persist)
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
            },
        }).concat(cartSyncMiddleware),
});

// Create the persistor
export const persistor = persistStore(store);
export default store;