import Order from '../models/OrderModel.js';
import Cart from '../models/CartModel.js';
import { StatusCodes } from "http-status-codes";
import { ORDERS, DELIVERY } from "../utils/constants.js";

// ✅ Place an Order
export const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      shippingAddress,
      paymentMethod,
      transactionId
    } = req.body;

    if (!userId || !shippingAddress || !paymentMethod) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User ID, shipping address, and payment method are required."
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.cartItems.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Cart is empty. Add items before placing an order."
      });
    }

    // Calculate order totals, matching the cart slice logic
    const totalAmount = cart.cartItems.reduce((total, meal) => {
      return total + meal.ingredients.reduce((sum, ing) => sum + ing.price * ing.quantity, 0);
    }, 0);

    const taxPrice = totalAmount * 0.1; // 10% tax rate from cart slice
    const shippingPrice = 300; // Default from cart slice

    const order = new Order({
      userId,
      cartItems: cart.cartItems,
      totalAmount: totalAmount + taxPrice + shippingPrice,
      shippingAddress,
      paymentMethod,
      transactionId,
      taxPrice,
      shippingPrice,
      status: ORDERS.PENDING,
      deliveryStatus: DELIVERY.SCHEDULED
    });

    await order.save();

    // Clear the cart after placing the order
    cart.cartItems = [];
    await cart.save();

    res.status(StatusCodes.CREATED).json(order);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to place order.",
      error: error.message
    });
  }
};

// ✅ Get Orders for a User
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    // Changed from "user" to "userId" to match the schema
    const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });
    if (!orders.length) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "No orders found." });
    }
    res.status(StatusCodes.OK).json({ orders }); // Wrap in an object with "orders" property
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve orders.",
      error: error.message
    });
  }
};

// ✅ Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found." });
    }

    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch order.",
      error: error.message
    });
  }
};

// ✅ Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!Object.values(ORDERS).includes(status)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid order status.",
        validStatuses: Object.values(ORDERS)
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found." });
    }

    order.status = status;

    // Update delivery status if relevant
    if (status === ORDERS.DELIVERED) {
      order.deliveryStatus = DELIVERY.DELIVERED;
      order.deliveredAt = new Date();
    } else if (status === ORDERS.PROCESSED) {
      // When the order is processed, delivery status becomes out for delivery
      order.deliveryStatus = DELIVERY.OUTFORDELIVERY;
    } else if (status === ORDERS.CANCELLED) {
      // If the order is cancelled, set delivery as failed
      order.deliveryStatus = DELIVERY.FAILED;
    }

    await order.save();

    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update order status.",
      error: error.message
    });
  }
};

// ✅ Update Delivery Status
export const updateDeliveryStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { deliveryStatus } = req.body;

    if (!Object.values(DELIVERY).includes(deliveryStatus)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid delivery status.",
        validStatuses: Object.values(DELIVERY)
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found." });
    }

    order.deliveryStatus = deliveryStatus;

    // Update order status if delivery status changes
    if (deliveryStatus === DELIVERY.DELIVERED) {
      order.status = ORDERS.DELIVERED;
      order.deliveredAt = new Date();
    } else if (deliveryStatus === DELIVERY.FAILED) {
      // Optional: you might want to handle failed deliveries differently
      // For example, by allowing redelivery or cancellation
    }

    await order.save();

    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update delivery status.",
      error: error.message
    });
  }
};

// ✅ Update Payment Status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { isPaid, paymentResult } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found." });
    }

    order.isPaid = isPaid;
    if (isPaid) {
      order.paidAt = new Date();

      // If payment is confirmed, update order status to processed 
      // (only if it was in pending state)
      if (order.status === ORDERS.PENDING) {
        order.status = ORDERS.PROCESSED;
      }
    }

    if (paymentResult) {
      order.paymentResult = paymentResult;
    }

    await order.save();

    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update payment status.",
      error: error.message
    });
  }
};

// ✅ Delete an Order
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found." });
    }

    await order.deleteOne();
    res.status(StatusCodes.OK).json({ message: "Order deleted successfully." });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to delete order.",
      error: error.message
    });
  }
};






// import Order from '../models/OrderModel.js';
// import ShoppingList from '../models/shoppingListModel.js';
// import Delivery from '../models/DeliveryModel.js';
// import { StatusCodes } from 'http-status-codes';
// import { NotFoundError } from '../errors/customErrors.js';

// // @desc    Place a new order based on shopping list ingredients and calculate totalAmount
// // @route   POST /api/orders
// export const placeOrder = async (req, res) => {
//   const {
//     shoppingList: shoppingListId,
//     deliveryAddress,
//     deliveryTime,
//   } = req.body;
//   const userId = req.user.userId; // Assuming user authentication

//   try {
//     // Find the shopping list to ensure it exists
//     const shoppingList = await ShoppingList.findById(shoppingListId).populate(
//       'ingredients'
//     );
//     if (!shoppingList) {
//       throw new NotFoundError(`No shopping list with id: ${shoppingListId}`);
//     }

//     // Map the ingredients to create order items
//     const orderItems = shoppingList.ingredients.map((ingredient) => ({
//       ingredient: ingredient._id,
//       quantity: 1, // Set quantity as 1 by default (you can adjust this if needed)
//       price: ingredient.price, // Assuming price is available on the ingredient model
//     }));

//     // Calculate the total amount by summing up the prices of the ingredients
//     const totalAmount = orderItems.reduce(
//       (total, item) => total + item.price,
//       0
//     );

//     // Create the order
//     const order = await Order.create({
//       user: userId,
//       shoppingList: shoppingListId, // Link to the shopping list
//       items: orderItems,
//       totalAmount, // Set the calculated totalAmount
//     });

//     // Create the delivery record linked to the order
//     const delivery = await Delivery.create({
//       order: order._id,
//       deliveryTime,
//       deliveryAddress,
//       trackingNumber: `TRACK${Math.floor(Math.random() * 100000)}`, // Generate a random tracking number
//     });

//     // Update the order with the delivery information
//     order.delivery = delivery._id;
//     await order.save();

//     res.status(StatusCodes.CREATED).json({ order, delivery });
//   } catch (error) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: error.message });
//   }
// };

// //@desc    Get all orders for a user
// // @route   GET /api/orders
// export const getUserOrders = async (req, res) => {
//   const userId = req.user.userId;

//   try {
//     const orders = await Order.find({ user: userId }).populate(
//       'items.ingredient delivery'
//     );
//     res.status(StatusCodes.OK).json({ orders });
//   } catch (error) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: error.message });
//   }
// };

// // @desc    Get order by ID
// // @route   GET /api/orders/:id
// export const getOrderById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const order = await Order.findById(id).populate(
//       'items.ingredient delivery'
//     );
//     if (!order) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: 'Order not found' });
//     }
//     res.status(StatusCodes.OK).json({ order });
//   } catch (error) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: error.message });
//   }
// };

// // @desc    Cancel an order
// // @route   DELETE /api/orders/:id
// export const cancelOrder = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const order = await Order.findById(id);
//     if (!order) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: 'Order not found' });
//     }

//     order.status = 'Cancelled';
//     await order.save();

//     res
//       .status(StatusCodes.OK)
//       .json({ message: 'Order cancelled successfully' });
//   } catch (error) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: error.message });
//   }
// };
