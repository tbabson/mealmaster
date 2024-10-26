import mongoose from 'mongoose';

const ReminderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meal',
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
      enum: ['once', 'daily', 'weekly', 'monthly'],
      default: 'once',
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription', // Reference to the subscription model
    },
    notified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Reminder', ReminderSchema);
