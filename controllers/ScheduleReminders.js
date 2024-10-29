import cron from 'node-cron';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Reminder from '../models/ReminderModel.js';
import { StatusCodes } from 'http-status-codes';
import {
  sendPushNotification,
  syncWithCalendar,
} from './ReminderController.js';
dotenv.config();
import moment from 'moment-timezone';

// Email setup for Nodemailer
// export const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,// false for port 587
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// Function to calculate the next reminder time based on frequency
// const getNextReminderTime = (currentReminderTime, frequency) => {
//   const nextTime = new Date(currentReminderTime);

//   switch (frequency) {
//     case 'daily':
//       nextTime.setDate(nextTime.getDate() + 1);
//       break;
//     case 'weekly':
//       nextTime.setDate(nextTime.getDate() + 7);
//       break;
//     case 'monthly':
//       nextTime.setMonth(nextTime.getMonth() + 1);
//       break;
//     // Add more cases for other frequencies if needed
//     default:
//       return null; // For non-recurring reminders
//   }

//   return nextTime;
// };

// // Function to check for reminders that are due and trigger notifications
// export const scheduleReminders = () => {
//   // Run every minute to check for upcoming reminders
//   cron.schedule('* * * * *', async () => {
//     try {
//       const now = new Date();

//       // Find reminders that are due for notification and haven't been notified yet
//       const dueReminders = await Reminder.find({
//         reminderTime: { $lte: new Date(new Date().getTime() + 60000) }, // 1-minute buffer
//         notified: false,
//       }).populate(['user', 'meal']);


//       // Process each due reminder
//       for (const reminder of dueReminders) {
//         // Send the appropriate notification
//         if (reminder.notificationMethod === 'email') {
//           await sendEmailReminder({ params: { id: reminder._id } }, { status: () => ({ json: () => { } }) });
//         } else if (reminder.notificationMethod === 'push') {
//           await sendPushNotification(
//             { params: { id: reminder._id } },
//             { status: () => ({ json: () => {} }) }
//           );
//         } else if (reminder.notificationMethod === 'calendar') {
//           await syncWithCalendar(
//             { params: { id: reminder._id } },
//             { status: () => ({ json: () => {} }) }
//           );
//         }

//         // If recurring, update the reminderTime to the next occurrence
//         if (reminder.isRecurring && reminder.recurringFrequency) {
//           const nextReminderTime = getNextReminderTime(
//             reminder.reminderTime,
//             reminder.recurringFrequency
//           );
//           if (nextReminderTime) {
//             reminder.reminderTime = nextReminderTime;
//           } else {
//             reminder.isRecurring = false; // Stop recurring if frequency is not recognized
//           }
//         } else {
//           // If non-recurring, mark as notified
//           reminder.notified = true;
//         }

//         // Save the updated reminder
//         await reminder.save();
//       }
//     } catch (error) {
//       console.error('Error processing reminders:', error);
//     }
//   });
// };




// Function to calculate the next reminder time based on frequency
// Function to calculate the next reminder time based on frequency
// const getNextReminderTime = (currentReminderTime, frequency) => {
//   const nextTime = new Date(currentReminderTime);

//   switch (frequency) {
//     case 'daily':
//       nextTime.setDate(nextTime.getDate() + 1);
//       break;
//     case 'weekly':
//       nextTime.setDate(nextTime.getDate() + 7);
//       break;
//     case 'monthly':
//       nextTime.setMonth(nextTime.getMonth() + 1);
//       break;
//     default:
//       return null;  // For non-recurring reminders or unknown frequency
//   }

//   return nextTime;
// };


// // Automatically sends an email and updates the reminder schema after sending
// const sendEmail = async (reminder) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: reminder.user.email,
//     subject: `Meal Reminder: ${reminder.meal.name}`,
//     text: `Hello ${reminder.user.fullName}, just a reminder to prepare your meal: ${reminder.meal.name} at ${reminder.reminderTime}.`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent for reminder ID: ${reminder._id}`);
//     reminder.notified = true;
//     await reminder.save(); // Update the schema after sending the email
//   } catch (error) {
//     console.error(`Error sending email for reminder ID ${reminder._id}:`, error);
//   }
// }

// // Function to check for reminders that are due and trigger notifications
// export const scheduleReminders = () => {
//   // Run every minute to check for upcoming reminders
//   cron.schedule('* * * * *', async () => {
//     const now = new Date();
//     console.log('Cron job triggered at', now);

//     try {
//       //const now = moment().tz("Africa/Lagos").toDate();
//       //const now = moment().toDate(); // Current time in server's timezone

//       // Find reminders that are due within the next minute and haven't been notified
//       const dueReminders = await Reminder.find({
//         //reminderTime: { $lte: new Date(now.getTime() + 60000) }, // 1-minute buffer
//         reminderTime: { $lte: now },
//         notified: false,
//       }).populate(['user', 'meal']);

//       if (dueReminders.length) {
//         console.log(`Processing ${dueReminders.length} due reminders at`, now);
//       }

//       // Process each due reminder
//       for (const reminder of dueReminders) {
//         let notificationSent = false;

//         // Check notification method and send the appropriate notification
//         if (reminder.notificationMethod === 'email') {
//           notificationSent = await sendEmail(reminder);
//         } else if (reminder.notificationMethod === 'push') {
//           await sendPushNotification({ params: { id: reminder._id } }, { status: () => ({ json: () => { } }) });
//         } else if (reminder.notificationMethod === 'calendar') {
//           await syncWithCalendar({ params: { id: reminder._id } }, { status: () => ({ json: () => { } }) });
//         }


//         // Update next reminder time if it's a recurring reminder
//         // Handle recurring reminders by calculating the next reminder time
//         if (notificationSent) {
//           if (reminder.isRecurring && reminder.recurringFrequency) {
//             const nextReminderTime = getNextReminderTime(reminder.reminderTime, reminder.recurringFrequency);
//             reminder.reminderTime = nextReminderTime || reminder.reminderTime;
//             reminder.isRecurring = !!nextReminderTime;
//           } else {
//             reminder.notified = true;
//           }

//           // Save the updated reminder
//           await reminder.save();
//         }
//       }
//     } catch (error) {
//       console.error('Error processing reminders:', error);
//     }
//   });
// };



// Email setup for Nodemailer
export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper function to calculate the next reminder time based on frequency
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
      return null;
  }

  return nextTime;
};

// Function to send email and update reminder as notified
const sendEmailReminder = async (reminder) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: reminder.user.email,
    subject: `Meal Reminder: ${reminder.meal.name}`,
    text: `Hello ${reminder.user.fullName}, just a reminder to prepare your meal: ${reminder.meal.name} at ${reminder.reminderTime}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent for reminder ID: ${reminder._id}`);
    reminder.notified = true; // Update notified to true after sending email
    await reminder.save(); // Save the updated reminder
  } catch (error) {
    console.error(`Error sending email for reminder ID ${reminder._id}:`, error);
  }
};

// Main function to check for reminders due and send notifications
export const scheduleReminders = () => {
  cron.schedule('* * * * *', async () => {
    const now = moment().tz('Africa/Lagos').toDate();
    console.log('Cron job triggered at', now);

    try {
      const dueReminders = await Reminder.find({
        reminderTime: { $lte: now },
        notified: false,
      }).populate(['user', 'meal']);

      if (dueReminders.length) {
        console.log(`Processing ${dueReminders.length} due reminders`);
      }

      for (const reminder of dueReminders) {
        // Check notification method and send the appropriate notification
        if (reminder.notificationMethod === 'email') {
          await sendEmailReminder(reminder);
        } else if (reminder.notificationMethod === 'push') {
          await sendPushNotification({ params: { id: reminder._id } }, { status: () => ({ json: () => { } }) });
        } else if (reminder.notificationMethod === 'calendar') {
          await syncWithCalendar({ params: { id: reminder._id } }, { status: () => ({ json: () => { } }) });
        }

        // Update next reminder time if it's a recurring reminder
        if (reminder.isRecurring && reminder.recurringFrequency) {
          const nextReminderTime = getNextReminderTime(reminder.reminderTime, reminder.recurringFrequency);
          reminder.reminderTime = nextReminderTime || reminder.reminderTime;
          reminder.isRecurring = !!nextReminderTime;
          await reminder.save();
        }
      }
    } catch (error) {
      console.error('Error processing reminders:', error);
    }
  });
};