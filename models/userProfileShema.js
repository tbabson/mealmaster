import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Please provide your full name'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide your password'],
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order', // Link to the Order model
            },
        ],
        mealSchedules: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'MealSchedule', // Link to the MealSchedule model
            },
        ],
        shoppingLists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ShoppingList', // Link to the ShoppingList model
            },
        ],
        reminders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Reminder', // Link to the Reminder model
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model('User', UserSchema);
