import User from '../models/UserSchema.js'
import { StatusCodes } from 'http-status-codes'
import { hashPassword, comparePassword } from '../utils/passwordUtils.js'
import { BadRequestError, UnauthenticatedError } from '../errors/customErrors.js'
import Order from '../models/OrderModel.js'; // Ensure models are imported
import shoppingListModel from '../models/shoppingListModel.js';
import Reminder from '../models/ReminderModel.js';





// GET ALL USERS CONTROLLER
export const getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.status(StatusCodes.OK).json({ users, count: users.length })
}

// SHOW CURRENT USER CONTROLLER
export const showCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId })
    const userWithoutPassword = user.toJSON()
    res.status(StatusCodes.OK).json({ user: userWithoutPassword })
    //res.status(StatusCodes.OK).json({ user: req.user });;
};

// GET SINGLE USER CONTROLLER
export const getUser = async (req, res) => {
    // note you can write the code in a single line, as seen below.
    const user = await User.findById(req.params.id).populate('orders').populate('shoppingLists').populate('reminders');
    res.status(StatusCodes.OK).json({ user })
}

// EDIT USER CONTROLLER
export const updateUser = async (req, res) => {
    //const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    //    new: true
    // })
    const obj = { ...req.body }
    delete obj.password
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj)

    res.status(StatusCodes.OK).json({ msg: 'user updated' })
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