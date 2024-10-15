import Order from '../models/OrderModel.js';
import Delivery from '../models/Delivery.js';
import { StatusCodes } from 'http-status-codes';

// @desc    Place a new order
// @route   POST /api/orders
export const placeOrder = async (req, res) => {
    const { items, totalAmount, deliveryAddress, deliveryTime } = req.body;
    const userId = req.user._id; // Assuming user authentication

    try {
        // Create the order
        const order = await Order.create({
            user: userId,
            items,
            totalAmount,
        });

        // Create the delivery record linked to the order
        const delivery = await Delivery.create({
            order: order._id,
            deliveryTime,
            deliveryAddress,
            trackingNumber: `TRACK${Math.floor(Math.random() * 100000)}`, // Generate a random tracking number
        });

        // Update the order with the delivery information
        order.delivery = delivery._id;
        await order.save();

        res.status(StatusCodes.CREATED).json({ order, delivery });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Get all orders for a user
// @route   GET /api/orders
export const getUserOrders = async (req, res) => {
    const userId = req.user._id;

    try {
        const orders = await Order.find({ user: userId }).populate('items.ingredient delivery');
        res.status(StatusCodes.OK).json({ orders });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
export const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id).populate('items.ingredient delivery');
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Order not found' });
        }
        res.status(StatusCodes.OK).json({ order });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Cancel an order
// @route   DELETE /api/orders/:id
export const cancelOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Order not found' });
        }

        order.status = 'Cancelled';
        await order.save();

        res.status(StatusCodes.OK).json({ message: 'Order cancelled successfully' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
