import Reminder from '../models/ReminderModel.js';
import { StatusCodes } from 'http-status-codes';
import Meal from '../models/MealModel.js'; // Assuming a Meal model exists
import nodemailer from 'nodemailer';

// Email setup for Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// @desc    Create a new meal reminder
// @route   POST /api/reminders
export const createReminder = async (req, res) => {
    const { meal: mealId, reminderTime, notificationMethod, isRecurring, recurringFrequency } = req.body;
    const userId = req.user.userId; // Assuming user authentication

    try {
        //Validate or fetch the provided meal
        const meal = await Meal.findById(mealId);
        if (!meal) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid meal ID provided' });
        }


        const reminder = await Reminder.create({
            user: userId,
            meal: meal._id,  // Link the valid meal ID,
            reminderTime,
            notificationMethod,
            isRecurring,
            recurringFrequency
        });

        res.status(StatusCodes.CREATED).json({ reminder });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};


// @desc    Create a new meal reminder 
// @route   POST /api/reminders
// export const createReminder = async (req, res) => {
//     const { meal: mealId, reminderTime, notificationMethod, isRecurring, recurringFrequency, healthGoals } = req.body;
//     const userId = req.user.userId; // Assuming user authentication

//     try {
//         // Validate or fetch the provided meal
//         const meal = await Meal.findById(mealId);
//         if (!meal) {
//             return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid meal ID provided' });
//         }

//         // Validate or fetch the provided health goals
//         const validHealthGoals = await HealthGoal.find({ _id: { $in: healthGoals } });
//         if (validHealthGoals.length !== healthGoals.length) {
//             return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid health goals provided' });
//         }

//         // Create a new reminder
//         const reminder = await Reminder.create({
//             user: userId,
//             meal: meal._id,  // Link the valid meal ID
//             reminderTime,
//             notificationMethod,
//             isRecurring,
//             recurringFrequency,
//             healthGoals: validHealthGoals.map(goal => goal._id), // Storing only the IDs of valid health goals
//         });

//         res.status(StatusCodes.CREATED).json({ reminder });
//     } catch (error) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
//     }
// };




// @desc    Send email reminder
// @route   POST /api/reminders/send-email/:id
export const sendEmailReminder = async (req, res) => {
    const { id } = req.params;

    try {
        const reminder = await Reminder.findById(id).populate('user meal');

        if (!reminder) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Reminder not found' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: reminder.user.email,
            subject: `Meal Reminder: ${reminder.meal.name}`,
            text: `Hello ${reminder.user.fullName}, just a reminder to prepare your meal: ${reminder.meal.name} at ${reminder.reminderTime}.`,
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
            res.status(StatusCodes.OK).json({ message: 'Email reminder sent', info });
        });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Sync reminder with calendar
// @route   POST /api/reminders/calendar-sync/:id
export const syncWithCalendar = async (req, res) => {
    const { id } = req.params;

    try {
        const reminder = await Reminder.findById(id).populate('user meal');

        if (!reminder) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Reminder not found' });
        }

        // Example logic to sync with calendar (i.e., Google Calendar)
        // Use Google Calendar API to create an event for this reminder
        // This is just a placeholder for now
        res.status(StatusCodes.OK).json({ message: 'Reminder synced with calendar' });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Get user reminders
// @route   GET /api/reminders
export const getUserReminders = async (req, res) => {
    const userId = req.user._id;

    try {
        const reminders = await Reminder.find({ user: userId }).populate('meal');
        res.status(StatusCodes.OK).json({ reminders });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Update reminder
// @route   PUT /api/reminders/:id
export const updateReminder = async (req, res) => {
    const { id } = req.params;
    const { reminderTime, notificationMethod, isRecurring, recurringFrequency, healthGoals } = req.body;

    try {
        const reminder = await Reminder.findById(id);
        if (!reminder) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Reminder not found' });
        }

        reminder.reminderTime = reminderTime || reminder.reminderTime;
        reminder.notificationMethod = notificationMethod || reminder.notificationMethod;
        reminder.isRecurring = isRecurring !== undefined ? isRecurring : reminder.isRecurring;
        reminder.recurringFrequency = recurringFrequency || reminder.recurringFrequency;
        //reminder.healthGoals = healthGoals || reminder.healthGoals;

        await reminder.save();
        res.status(StatusCodes.OK).json({ reminder });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
