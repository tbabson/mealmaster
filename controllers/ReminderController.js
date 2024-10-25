import Reminder from '../models/ReminderModel.js';
import Subscription from '../models/SubscriptionModel.js';
import { StatusCodes } from 'http-status-codes';
import Meal from '../models/MealModel.js'; // Assuming a Meal model exists
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import webPush from 'web-push';
import dotenv from 'dotenv';
dotenv.config();


// Email setup for Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,// false for port 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


// VAPID key configuration
const vapidKeys = {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY
};

webPush.setVapidDetails(
    'mailto:babatunde.taiwoadekunle@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

// webPush.setVapidDetails(
//     'mailto:babatunde.taiwoadekunle@gmail.com',
//     process.env.VAPID_PUBLIC_KEY,
//     process.env.VAPID_PRIVATE_KEY
// );


// @desc Save push subscription
// @route POST /api/reminders/save-subscription/:id
// export const savePushSubscription = async (req, res) => {
//     const { id } = req.params;
//     const { subscription } = req.body;

//     try {
//         const reminder = await Reminder.findById(id);
//         if (!reminder) {
//             return res.status(StatusCodes.NOT_FOUND).json({ message: 'Reminder not found' });
//         }

//         reminder.pushSubscription = subscription;
//         await reminder.save();
//         res.status(StatusCodes.OK).json({ message: 'Push subscription saved successfully' });
//     } catch (error) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
//     }
// };


// Save the push subscription in the database

export const savePushSubscription = async (req, res) => {
    const { endpoint, keys } = req.body;

    try {
        // Save subscription to the database
        const subscription = await Subscription.create({
            endpoint,
            p256dh: keys.p256dh,
            auth: keys.auth,
        });

        res.status(StatusCodes.CREATED).json({ message: 'Push subscription saved successfully', subscription });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to save subscription' });
    }
};




// @desc    Create a new meal reminder
// @route   POST /api/reminders
export const createReminder = async (req, res) => {
    const {
        meal: mealId,
        reminderTime,
        notificationMethod,
        isRecurring,
        recurringFrequency,
        subscription,
    } = req.body;
    const userId = req.user.userId; // Assuming user authentication

    try {
        //Validate or fetch the provided meal
        const meal = await Meal.findById(mealId);
        if (!meal) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: 'Invalid meal ID provided' });
        }

        // Save the subscription if provided
        let savedSubscription = null;
        if (subscription) {
            savedSubscription = await Subscription.create({
                endpoint: subscription.endpoint,
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth,
            });
        }

        const reminder = await Reminder.create({
            user: userId,
            meal: meal._id, // Link the valid meal ID,
            reminderTime,
            notificationMethod,
            isRecurring,
            recurringFrequency,
            subscription: savedSubscription ? savedSubscription._id : null,
        });

        res.status(StatusCodes.CREATED).json({ reminder });
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
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
        // Populate user and meal with only necessary fields
        const reminder = await Reminder.findById(id).populate([
            { path: 'user', select: 'email fullName' },
            { path: 'meal', select: 'name' },
        ]);

        if (!reminder) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: 'Reminder not found' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: reminder.user.email, // User's email should now be populated
            subject: `Meal Reminder: ${reminder.meal.name}`,
            text: `Hello ${reminder.user.fullName}, just a reminder to prepare your meal: ${reminder.meal.name} at ${reminder.reminderTime}.`,
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ message: error.message });
            }
            res.status(StatusCodes.OK).json({ message: 'Email reminder sent', info });
        });
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};



// @desc Send push notification
// @route POST /api/reminders/send-push/:id
export const sendPushNotification = async (req, res) => {
    const { id } = req.params;

    try {
        const reminder = await Reminder.findById(id).populate('user meal');
        if (!reminder) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Reminder not found' });
        }

        // Check if push subscription exists in the reminder object
        if (!reminder.subscription || !reminder.subscription.endpoint) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'No push subscription found for the user' });
        }

        // Extract subscription details from the reminder
        const subscription = {
            endpoint: reminder.subscription.endpoint,
            keys: {
                p256dh: reminder.subscription.keys.p256dh,
                auth: reminder.subscription.keys.auth
            }
        };

        // Create the notification payload
        const payload = JSON.stringify({
            title: `Meal Reminder: ${reminder.meal.name}`,
            body: `Hello ${reminder.user.fullName}, it's time to prepare your meal: ${reminder.meal.name}.`,
        });

        // Send the push notification
        await webPush.sendNotification(subscription, payload);
        res.status(StatusCodes.OK).json({ message: 'Push notification sent successfully' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};


// @desc    Sync reminder with calendar
// @route   POST /api/reminders/calendar-sync/:id
// export const syncWithCalendar = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const reminder = await Reminder.findById(id).populate('user meal');

//         if (!reminder) {
//             return res.status(StatusCodes.NOT_FOUND).json({ message: 'Reminder not found' });
//         }

//         // Example logic to sync with calendar (i.e., Google Calendar)
//         // Use Google Calendar API to create an event for this reminder
//         // This is just a placeholder for now
//         res.status(StatusCodes.OK).json({ message: 'Reminder synced with calendar' });

//     } catch (error) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
//     }
// };

// Google API setup (you need to configure this with your credentials)



const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// @desc    Sync reminder with Google Calendar
// @route   POST /api/reminders/calendar-sync/:id
export const syncWithCalendar = async (req, res) => {
    const { id } = req.params;

    try {
        // Retrieve reminder and populate related data
        const reminder = await Reminder.findById(id).populate('user meal');
        if (!reminder) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Reminder not found' });
        }

        // Check for the user's refresh token
        if (!req.user.googleRefreshToken) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Missing Google refresh token' });
        }

        // Set credentials using the user's refresh token
        oAuth2Client.setCredentials({ refresh_token: req.user.googleRefreshToken });
        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

        // Define the Google Calendar event details
        const event = {
            summary: `Meal Reminder: ${reminder.meal.name}`,
            description: `Reminder to have your meal: ${reminder.meal.name}`,
            start: {
                dateTime: new Date(reminder.reminderTime).toISOString(),
                timeZone: 'Africa/Lagos', // Corrected time zone for Nigeria
            },
            end: {
                dateTime: new Date(new Date(reminder.reminderTime).getTime() + 60 * 60 * 1000).toISOString(),
                timeZone: 'Africa/Lagos',
            },
            attendees: [{ email: reminder.user.email }],
        };

        // Insert the event into the user's Google Calendar
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });

        res.status(StatusCodes.OK).json({
            message: 'Reminder synced with calendar',
            eventLink: response.data.htmlLink,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};


// @desc    Get user reminders
// @route   GET /api/reminders
export const getUserReminders = async (req, res) => {
    const userId = req.user.userId;

    try {
        const reminders = await Reminder.find({ user: userId }).populate('meal');
        res.status(StatusCodes.OK).json({ reminders });
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

// @desc    Update reminder
// @route   PUT /api/reminders/:id
export const updateReminder = async (req, res) => {
    const { id } = req.params;
    const {
        reminderTime,
        notificationMethod,
        isRecurring,
        recurringFrequency,
    } = req.body;

    try {
        const reminder = await Reminder.findById(id);
        if (!reminder) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: 'Reminder not found' });
        }

        reminder.reminderTime = reminderTime || reminder.reminderTime;
        reminder.notificationMethod =
            notificationMethod || reminder.notificationMethod;
        reminder.isRecurring =
            isRecurring !== undefined ? isRecurring : reminder.isRecurring;
        reminder.recurringFrequency =
            recurringFrequency || reminder.recurringFrequency;
        //reminder.healthGoals = healthGoals || reminder.healthGoals;

        await reminder.save();
        res.status(StatusCodes.OK).json({ reminder });
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};


// @desc    Save push subscription for reminders
// @route   POST /api/reminders/subscribe
// export const savePushSubscription = async (req, res) => {
//     const { subscription, mealId } = req.body;
//     const userId = req.user._id; // Assuming user authentication

//     try {
//         // Find or create the reminder for this meal and user
//         let reminder = await Reminder.findOne({ user: userId, meal: mealId });

//         if (!reminder) {
//             return res.status(StatusCodes.NOT_FOUND).json({ message: 'Reminder not found' });
//         }

//         // Save the push subscription in the reminder
//         reminder.pushSubscription = subscription;
//         await reminder.save();

//         res.status(StatusCodes.OK).json({ message: 'Push subscription saved successfully' });
//     } catch (error) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
//     }
// };