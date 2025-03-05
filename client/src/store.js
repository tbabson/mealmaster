import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Features/Cart/cartSlice';
import userReducer from './Features/user/userSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
    },
});

export default store;