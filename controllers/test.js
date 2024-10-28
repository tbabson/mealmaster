// // service-worker.js

// self.addEventListener('push', function (event) {
//   const data = event.data.json();

//   const options = {
//     body: data.body,
//     icon: 'images/icon.png', // Replace with your icon
//     badge: 'images/badge.png', // Replace with your badge image
//   };

//   event.waitUntil(
//     self.registration.showNotification(data.title, options)
//   );
// });

// //Request User Permission

// if ('serviceWorker' in navigator && 'PushManager' in window) {
//   navigator.serviceWorker.register('/service-worker.js')
//     .then(function (registration) {
//       console.log('Service Worker registered with scope:', registration.scope);

//       return Notification.requestPermission();
//     })
//     .then(function (permission) {
//       if (permission === 'granted') {
//         console.log('Notification permission granted.');

//         // Subscribe the user to push notifications
//         return subscribeUserToPush(registration);
//       } else {
//         console.error('Unable to get permission to notify.');
//       }
//     });
// }

// //Subscribe to Push Notifications

// function subscribeUserToPush(registration) {
//   const applicationServerKey = urlB64ToUint8Array('<Your Public VAPID Key>'); // Replace with your VAPID public key
//   return registration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: applicationServerKey,
//   }).then(function (subscription) {
//     console.log('User is subscribed:', subscription);

//     // You can now send the subscription object to your server
//     // subscription.endpoint contains the endpoint
//     // subscription.keys.p256dh contains the public key
//     // subscription.keys.auth contains the auth secret
//     saveSubscriptionToServer(subscription);
//   }).catch(function (err) {
//     console.log('Failed to subscribe the user: ', err);
//   });
// }

// // Convert URL-safe base64 string to Uint8Array
// function urlB64ToUint8Array(base64String) {
//   const padding = '='.repeat((4 - base64String.length % 4) % 4);
//   const base64 = (base64String + padding)
//     .replace(/-/g, '+')
//     .replace(/_/g, '/');

//   const rawData = window.atob(base64);
//   return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
// }

////Define the Subscription Model

import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true
  },
  p256dh: {
    type: String,
    required: true
  },
  auth: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;


////Set Up the Service Layer

import Subscription from '../models/subscription';
import webPush from 'web-push';

// Configure VAPID keys
const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY
};

webPush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export const saveSubscription = async (subscription) => {
  await Subscription.create({
    endpoint: subscription.endpoint,
    p256dh: subscription.keys.p256dh,
    auth: subscription.keys.auth
  });
};

export const sendNotification = async (title, body, image) => {
  const subscriptions = await Subscription.find();
  subscriptions.forEach((subscription) => {
    const sub = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.p256dh,
        auth: subscription.auth
      }
    };
    const payload = JSON.stringify({
      notification: {
        title,
        body,
        image,
      },
    });
    webPush.sendNotification(sub, payload)
      .catch(error => console.error('Error sending notification:', error));
  });
};


////Create API Routes and Controllers

const { saveSubscription, sendNotification } = require('../../services/subscriptionService');

exports.subscribe = async (req, res) => {
  try {
    const subscription = req.body;
    await saveSubscription(subscription);
    res.status(201).json({ message: 'Subscription added successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to subscribe.' });
  }
};

exports.pushNotification = async (req, res) => {
  try {
    const { title, body, image } = req.body;
    await sendNotification(title, body, image);
    res.status(200).json({ message: 'Notification sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send notification.' });
  }
};

/////Create src/api/routes/subscriptionRoutes.ts to define the API routes.


const { Router } = require('express');
const { subscribe, pushNotification } = require('../controllers/subscriptionController');

const router = Router();

router.post('/subscribe', subscribe);
router.post('/push', pushNotification);

module.exports = router;




import cron from 'node-cron';
import moment from 'moment-timezone';
import Reminder from '../models/ReminderModel.js';
import {
  sendEmailReminder,
  sendPushNotification,
  syncWithCalendar,
} from './ReminderController.js';
import { getNextReminderTime } from './utils/timeUtils.js'; // Assuming this helper calculates recurring times

// Schedule the cron job to run every minute, adjusting for each user's local time
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();

    // Fetch reminders due within the next minute that haven't been notified
    const reminders = await Reminder.find({
      notified: false,
      reminderTime: { $lte: now },
    }).populate('user');

    for (const reminder of reminders) {
      const userTimezone = reminder.timezone || 'UTC'; // Default to UTC if timezone not set
      const reminderLocalTime = moment(reminder.reminderTime).tz(userTimezone).format('YYYY-MM-DD HH:mm:ss');

      // Compare current local time to the reminder time in the user’s timezone
      const nowLocalTime = moment().tz(userTimezone).format('YYYY-MM-DD HH:mm:ss');
      if (nowLocalTime >= reminderLocalTime) {
        console.log(`Cron triggered for user at local time: ${nowLocalTime} for reminder: ${reminder._id}`);

        // Send appropriate notification
        if (reminder.notificationMethod === 'email') {
          await sendEmailReminder({ params: { id: reminder._id } }, { status: () => ({ json: () => { } }) });
        } else if (reminder.notificationMethod === 'push') {
          await sendPushNotification({ params: { id: reminder._id } }, { status: () => ({ json: () => { } }) });
        } else if (reminder.notificationMethod === 'calendar') {
          await syncWithCalendar({ params: { id: reminder._id } }, { status: () => ({ json: () => { } }) });
        }

        // Update for recurring reminders if needed
        if (reminder.isRecurring && reminder.recurringFrequency) {
          reminder.reminderTime = getNextReminderTime(reminder.reminderTime, reminder.recurringFrequency);
        } else {
          reminder.notified = true; // Mark non-recurring reminders as notified
        }

        // Save changes
        await reminder.save();
      }
    }
  } catch (error) {
    console.error('Error processing reminders:', error);
  }
});



cron.schedule('* * * * *', async () => {
  const localTime = new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
  console.log('Cron job triggered at', localTime);


  if (reminder.notificationMethod === 'email') {
    await sendEmailAndUpdateReminder(reminder);
  } else if (reminder.notificationMethod === 'push') {
    // Add logic to send push notification if needed
  } else if (reminder.notificationMethod === 'calendar') {
    // Add logic to sync with calendar if needed
  }






  import cron from 'node-cron';
  import Reminder from '../models/ReminderModel.js';
  import { transporter } from './emailService.js'; // Ensure this is imported
  import {
    sendEmailReminder,
    sendPushNotification,
    syncWithCalendar,
  } from './ReminderController.js';
  import { StatusCodes } from 'http-status-codes';

  // Function to calculate the next reminder time based on frequency
  const getNextReminderTime = (currentReminderTime, frequency) => {
    const nextTime = new Date(currentReminderTime);

    switch (frequency) {
      case 'daily':
        nextTime.setDate(nextTime.getDate() + 1);
        break;
      case 'weekly':
        nextTime.setDate(nextTime.getDate() + 7);
        break;
      case 'monthly':
        nextTime.setMonth(nextTime.getMonth() + 1);
        break;
      default:
        return null; // For non-recurring reminders
    }

    return nextTime;
  };

  // Automatically sends an email and updates the reminder schema after sending
  const sendEmailAndUpdateReminder = async (reminder) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: reminder.user.email,
      subject: `Meal Reminder: ${reminder.meal.name}`,
      text: `Hello ${reminder.user.fullName}, just a reminder to prepare your meal: ${reminder.meal.name} at ${reminder.reminderTime}.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent for reminder ID: ${reminder._id}`);
      reminder.notified = true; // Mark as notified after successful email
      await reminder.save();
    } catch (error) {
      console.error(`Error sending email for reminder ID ${reminder._id}:`, error);
    }
  };

  // Function to check for reminders that are due and trigger notifications
  export const scheduleReminders = () => {
    cron.schedule('* * * * *', async () => {
      try {
        const now = new Date();

        // Find reminders that are due and haven't been notified yet
        const dueReminders = await Reminder.find({
          notified: false,
        }).populate(['user', 'meal']);

        // Process each due reminder
        for (const reminder of dueReminders) {
          const userTimezone = reminder.timezone || 'UTC'; // Default to UTC if timezone not set

          // Get the reminder time in the user's local timezone
          const reminderLocalTime = new Date(reminder.reminderTime).toLocaleString('en-US', { timeZone: userTimezone });
          const reminderDate = new Date(reminderLocalTime); // Convert back to Date for comparison

          // Compare the reminder time with the current time in the user's timezone
          if (reminderDate <= now) {
            // Send notifications based on the method
            if (reminder.notificationMethod === 'email') {
              await sendEmailAndUpdateReminder(reminder);
            } else if (reminder.notificationMethod === 'push') {
              await sendPushNotification({ params: { id: reminder._id } }, { status: () => ({ json: () => { } }) });
            } else if (reminder.notificationMethod === 'calendar') {
              await syncWithCalendar({ params: { id: reminder._id } }, { status: () => ({ json: () => { } }) });
            }

            // Update next reminder time if it's a recurring reminder
            if (reminder.isRecurring && reminder.recurringFrequency) {
              const nextReminderTime = getNextReminderTime(reminder.reminderTime, reminder.recurringFrequency);
              reminder.reminderTime = nextReminderTime || reminder.reminderTime;
              reminder.isRecurring = !!nextReminderTime; // Stop recurring if next time is invalid
            }

            // Save updated reminder
            await reminder.save();
          }
        }
      } catch (error) {
        console.error('Error processing reminders:', error);
      }
    });
  };
