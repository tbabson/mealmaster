import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { syncCart } from './Features/Cart/cartSlice';
import userReducer from './Features/user/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Configure persistence for cart
const cartPersistConfig = {
    key: 'cart',
    storage,
    whitelist: ['cartItems', 'numItemsInCart', 'cartTotal', 'shipping', 'tax', 'orderTotal'] // only persist these fields
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
                userID: user.user._id,
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