import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Features/Cart/cartSlice';

const store = configureStore({
    reducer: {
        cartState: cartReducer,
    },
});

export default store;