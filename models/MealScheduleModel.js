import mongoose from 'mongoose';

const MealScheduleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    meal: {
      type: mongoose.Schema.ObjectId,
      ref: 'Meal',
      required: true,
    },
    mealType: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
      default: 'Breakfast',
      required: true,
    },
    scheduledTime: {
      type: Date,
      required: true,
    },
    reminderTime: {
      type: Date,
      required: true,
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
    mealPrepAlert: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('MealSchedule', MealScheduleSchema);
