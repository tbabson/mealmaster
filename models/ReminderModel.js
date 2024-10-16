import mongoose from 'mongoose';

const ReminderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    meal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal', // Reference to the Meal model (assuming meal records exist)
        required: true,
    },
    reminderTime: {
        type: Date,
        required: [true, 'Reminder time is required'],
    },
    notificationMethod: {
        type: String,
        enum: ['email', 'push', 'calendar'],
        required: [true, 'Notification method is required'],
    },
    isRecurring: {
        type: Boolean,
        default: false,
    },
    recurringFrequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'], // Recurring reminders (optional)
        default: null,
    },
    healthGoals: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HealthGoal', // Reference to Health Goals (optional feature)
    },
}, { timestamps: true });

export default mongoose.model('Reminder', ReminderSchema);
