import User from '../models/UserSchema.js'
import { StatusCodes } from 'http-status-codes'
import { hashPassword, comparePassword } from '../utils/passwordUtils.js'
import { BadRequestError, UnauthenticatedError } from '../errors/customErrors.js'
import Order from '../models/OrderModel.js'; // Ensure models are imported
import Reminder from '../models/ReminderModel.js'
import Cart from '../models/CartModel.js';
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';



export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users and populate orders and reminders
        const users = await User.find({})
            .populate('orders')
            .populate('reminders');

        // Need to handle cartItems separately since Cart references User via userId
        const usersWithData = await Promise.all(users.map(async (user) => {
            const userData = user.toObject();

            // Find cart items for this user
            const cartItems = await Cart.find({ userId: user._id });

            // Add cart items to user data using the correct field name from schema
            return {
                ...userData,
                cartItems
            };
        }));

        res.status(StatusCodes.OK).json({
            users: usersWithData,
            count: users.length
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred while fetching users",
            error
        });
    }
}

export const showCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }
        res.status(StatusCodes.OK).json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Server error fetching user",
        });
    }
};

// GET SINGLE USER CONTROLLER
export const getUser = async (req, res) => {
    try {
        // Fetch the user
        const user = await User.findById(req.params.id)
            .populate('orders')
            .populate('reminders');

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }

        // Fetch cart items separately
        const cartItems = await Cart.find({ userId: user._id });

        // Fetch orders with userId field instead of user
        const orders = await Order.find({ userId: user._id }).sort({ createdAt: -1 });

        // Fetch reminders
        const reminders = await Reminder.find({ user: user._id });

        // Send the response with user and related documents
        res.status(StatusCodes.OK).json({
            user,
            orders,
            cartItems,
            reminders,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred", error });
    }
};

// EDIT USER CONTROLLER
export const updateUser = async (req, res) => {
    try {
        const obj = { ...req.body };
        delete obj.password;

        // Handle image upload if there's a file
        if (req.file) {
            // If user already has an image, delete it from Cloudinary
            const currentUser = await User.findById(req.user.userId);
            if (currentUser.profileImage && currentUser.cloudinaryId) {
                await cloudinary.v2.uploader.destroy(currentUser.cloudinaryId);
            }

            // Upload new image to Cloudinary
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'mealmaster/users',
                use_filename: true,
            });

            // Remove local file after upload
            const absolutePath = path.resolve(req.file.path);
            await fs.unlink(absolutePath);

            // Add Cloudinary data to the update object
            obj.profileImage = result.secure_url;
            obj.cloudinaryId = result.public_id;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            obj,
            { new: true }
        ).select('-password');

        res.status(StatusCodes.OK).json({ user: updatedUser });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error updating user profile",
            error: error.message
        });
    }
}

// DELETE USER CONTROLLER
export const deleteUser = async (req, res) => {
    const removedUser = await User.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({ msg: 'user deleted', user: removedUser })
}

// UPDATE USER PASSWORD CONTROLLER
export const changeUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (newPassword.length < 8) {
        throw new UnauthenticatedError('Password must be at least 8 characters long');
    }

    // if (!oldPassword || !newPassword) {
    //     throw new BadRequestError('Please provide required input');
    // }
    const user = await User.findOne({ _id: req.user.userId });

    const isValidUser = user && await comparePassword(req.body.oldPassword, user.password)

    if (!isValidUser) throw new UnauthenticatedError('Enter correct old password')

    const hashedPassword = await hashPassword(req.body.newPassword)
    req.body.password = newPassword
    user.password = hashedPassword;

    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Changed.' });
};