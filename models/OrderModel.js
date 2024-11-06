import mongoose from 'mongoose';
import { ORDERS } from "../utils/constants.js"
import _default from "http-status-codes";

// Order Item Schema to represent products within an order
const OrderItemSchema = new mongoose.Schema({
    ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient', // Reference to Ingredient model
        required: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
});

// Order Schema
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model (assuming user authentication is implemented)
        required: true,
    },
    items: [OrderItemSchema], // Array of order items
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
    },
    status: {
        type: String,
        enum: Object.values(ORDERS),
        default: ORDERS.PENDING,
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Delivery', // Reference to Delivery model
    },
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);
