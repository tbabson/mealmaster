import MealSchedule from '../models/MealScheduleModel.js';
import { StatusCodes } from 'http-status-codes';

// @desc    Schedule a meal
// @route   POST /api/meals/schedule
export const scheduleMeal = async (req, res) => {
  const { user, meal, mealType, scheduledTime, reminderTime } = req.body;

  try {
    // Create a meal schedule
    const mealSchedule = await MealSchedule.create({
      user,
      meal,
      mealType,
      scheduledTime,
      reminderTime,
    });

    res.status(StatusCodes.CREATED).json({ mealSchedule });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// @desc    Get all meal schedules for a user
// @route   GET /api/meals/schedules/:userId
export const getMealSchedules = async (req, res) => {
  const { userId } = req.params;

  try {
    const mealSchedules = await MealSchedule.find({ user: userId }).populate(
      'meal'
    );
    res.status(StatusCodes.OK).json({ mealSchedules });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// @desc    Update a meal schedule
// @route   PUT /api/meals/schedules/:id
export const updateMealSchedule = async (req, res) => {
  const { id } = req.params;
  const { scheduledTime, reminderTime } = req.body;

  try {
    const mealSchedule = await MealSchedule.findById(id);

    if (!mealSchedule) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Meal schedule not found' });
    }

    mealSchedule.scheduledTime = scheduledTime || mealSchedule.scheduledTime;
    mealSchedule.reminderTime = reminderTime || mealSchedule.reminderTime;

    await mealSchedule.save();
    res.status(StatusCodes.OK).json({ mealSchedule });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// @desc    Delete a meal schedule
// @route   DELETE /api/meals/schedules/:id
export const deleteMealSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const mealSchedule = await MealSchedule.findById(id);
    if (!mealSchedule) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Meal schedule not found' });
    }

    await mealSchedule.remove();
    res
      .status(StatusCodes.OK)
      .json({ message: 'Meal schedule deleted successfully' });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// @desc    Get reminders for upcoming meals
// @route   GET /api/meals/reminders/:userId
export const getUpcomingReminders = async (req, res) => {
  const { userId } = req.params;
  const currentTime = new Date();

  try {
    const reminders = await MealSchedule.find({
      user: userId,
      reminderTime: { $gte: currentTime },
      reminderSent: false,
    }).populate('meal');

    res.status(StatusCodes.OK).json({ reminders });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
