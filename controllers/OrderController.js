import Order from '../models/OrderModel.js';
import ShoppingList from '../models/shoppingListModel.js';
import Delivery from '../models/DeliveryModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

// @desc    Place a new order based on shopping list ingredients and calculate totalAmount
// @route   POST /api/orders
export const placeOrder = async (req, res) => {
  const {
    shoppingList: shoppingListId,
    deliveryAddress,
    deliveryTime,
  } = req.body;
  const userId = req.user.userId; // Assuming user authentication

  try {
    // Find the shopping list to ensure it exists
    const shoppingList = await ShoppingList.findById(shoppingListId).populate(
      'ingredients'
    );
    if (!shoppingList) {
      throw new NotFoundError(`No shopping list with id: ${shoppingListId}`);
    }

    // Map the ingredients to create order items
    const orderItems = shoppingList.ingredients.map((ingredient) => ({
      ingredient: ingredient._id,
      quantity: 1, // Set quantity as 1 by default (you can adjust this if needed)
      price: ingredient.price, // Assuming price is available on the ingredient model
    }));

    // Calculate the total amount by summing up the prices of the ingredients
    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price,
      0
    );

    // Create the order
    const order = await Order.create({
      user: userId,
      shoppingList: shoppingListId, // Link to the shopping list
      items: orderItems,
      totalAmount, // Set the calculated totalAmount
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

//@desc    Get all orders for a user
// @route   GET /api/orders
export const getUserOrders = async (req, res) => {
  const userId = req.user.userId;

  try {
    const orders = await Order.find({ user: userId }).populate(
      'items.ingredient delivery'
    );
    res.status(StatusCodes.OK).json({ orders });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate(
      'items.ingredient delivery'
    );
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Order not found' });
    }
    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// @desc    Cancel an order
// @route   DELETE /api/orders/:id
export const cancelOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Order not found' });
    }

    order.status = 'Cancelled';
    await order.save();

    res
      .status(StatusCodes.OK)
      .json({ message: 'Order cancelled successfully' });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
