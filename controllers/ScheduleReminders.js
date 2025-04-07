/////NEW CODE//////


import cron from 'node-cron';
import dotenv from 'dotenv';
dotenv.config();
import schedule from 'node-schedule';
import Reminder from '../models/ReminderModel.js';
import { transporter } from '../utils/transporter.js';
import moment from 'moment-timezone';
import { google } from 'googleapis';
import fs from 'fs';
import readline from 'readline'

// Load client secrets from a local file
//const CREDENTIALS_PATH = '../utils/credentials.json'; // Path to Google API credentials file
//const TOKEN_PATH = '../utils/token.json'; // Path where OAuth tokens will be saved


// ----- Google API Setup -----

const authClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Define TOKEN_PATH as needed
// const TOKEN_PATH = '../utils/token.json';

const loadSavedToken = () => {
  try {
    const token = fs.readFileSync(TOKEN_PATH, 'utf-8');
    authClient.setCredentials(JSON.parse(token));
  } catch (err) {
    console.error('Error loading token:', err);
  }
};

const saveToken = (token) => {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to', TOKEN_PATH);
};

export const authenticateGoogleAPI = async () => {
  const authUrl = authClient.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ],
  });
  console.log('Authorize this app by visiting this URL:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the authorization code from that page here: ', async (authCode) => {
    rl.close();
    const { tokens } = await authClient.getToken(authCode);
    authClient.setCredentials(tokens);
    saveToken(tokens);
    console.log('Successfully authenticated and saved tokens!');
  });
};

// ----- Helper Functions for Meal Preparation -----

const hasValidPreparationSteps = (meal) => {
  return meal.preparationSteps &&
    Array.isArray(meal.preparationSteps) &&
    meal.preparationSteps.length > 0 &&
    meal.preparationSteps[0].steps &&
    Array.isArray(meal.preparationSteps[0].steps) &&
    meal.preparationSteps[0].steps.length > 0;
};

const formatPreparationSteps = (meal, format = 'text') => {
  if (!hasValidPreparationSteps(meal)) {
    return format === 'text'
      ? 'No preparation steps provided.'
      : '<li>No preparation steps provided.</li>';
  }

  const steps = meal.preparationSteps[0].steps;

  if (format === 'text') {
    return steps.map(({ stepNumber, instruction, duration }) =>
      `Step ${stepNumber}: ${instruction} (Duration: ${duration || 'N/A'})`
    ).join('\n');
  } else {
    return steps.map(({ stepNumber, instruction, duration }) => `
      <li>
        <strong>Step ${stepNumber}</strong>: ${instruction}
        <span style="color: #7f8c8d; font-style: italic; margin-left: 10px;">
          (Duration: ${duration || 'N/A'})
        </span>
      </li>
    `).join('');
  }
};

// ----- Notification Functions -----

const sendEmailReminder = async (reminderId) => {
  try {
    const reminder = await Reminder.findById(reminderId)
      .populate({
        path: 'meal',
        select: 'name image ingredients preparationSteps',
        populate: [
          { path: 'ingredients', select: 'name' },
          {
            path: 'preparationSteps',
            select: 'description skillLevel steps',
            populate: {
              path: 'steps',
              select: 'stepNumber instruction duration _id'
            }
          }
        ]
      })
      .populate('user', 'email fullName');

    if (!reminder) {
      console.error(`Reminder with ID ${reminderId} not found.`);
      return false;
    }

    const { meal, user, reminderTime } = reminder;
    const ingredientNames = meal.ingredients.map(({ name }) => name).join(', ');
    const ingredientsList = meal.ingredients.map(({ name }) => `<li>${name}</li>`).join('');
    const textSteps = formatPreparationSteps(meal, 'text');
    const htmlSteps = formatPreparationSteps(meal, 'html');
    const formattedTime = new Date(reminderTime).toLocaleString();

    const mailOptions = {
      from: `"Meal Reminder" <${process.env.EMAIL_USER}>`,
      to: user.email,
      replyTo: process.env.EMAIL_USER,
      subject: `Meal Reminder: ${meal.name}`,
      text: `Hello ${user.fullName},

Just a reminder to prepare your meal: ${meal.name}

Meal Details:
- Image: ${meal.image || 'N/A'}
- Ingredients: ${ingredientNames}

Preparation Steps:
${textSteps}

Scheduled Time: ${formattedTime}

Enjoy your meal!`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Meal Reminder</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333;">Meal Reminder: ${meal.name}</h1>
        <p>Hello ${user.fullName},</p>
        <p>Just a reminder to prepare your delicious meal.</p>
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
          <h2 style="color: #2c3e50;">Meal Details</h2>
          ${meal.image ? `
          <div style="text-align: center; margin-bottom: 15px;">
            <img src="${meal.image}" alt="${meal.name}" style="max-width: 300px; border-radius: 10px;">
          </div>` : ''}
          <h3 style="color: #34495e;">Ingredients</h3>
          <ul style="list-style-type: disc; padding-left: 20px;">
            ${ingredientsList}
          </ul>
          <h3 style="color: #34495e;">Preparation Steps</h3>
          <ol style="padding-left: 20px; list-style: none;">
            ${htmlSteps}
          </ol>
        </div>
        <p style="margin-top: 15px;">
          <strong>Scheduled Time:</strong> ${formattedTime}
        </p>
        <p style="color: #7f8c8d; font-style: italic;">Enjoy your meal!</p>
        <hr style="margin-top: 20px; border: 0; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #999;">
          This is an automated reminder. Please do not reply to this email.
        </p>
      </body>
      </html>`
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email reminder sent for meal "${meal.name}"`);
    return true;
  } catch (error) {
    console.error('Error sending email reminder:', error);
    if (error.response) {
      console.error('SMTP response failed:', error.response);
    }
    return false;
  }
};

const syncWithCalendar = async (reminder) => {
  try {
    loadSavedToken();
    const calendar = google.calendar({ version: 'v3', auth: authClient });
    const event = {
      summary: `Meal Reminder: ${reminder.meal.name}`,
      description: `It's time to prepare your meal: ${reminder.meal.name}`,
      start: {
        dateTime: reminder.reminderTime.toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(new Date(reminder.reminderTime).getTime() + 60 * 60 * 1000).toISOString(),
        timeZone: 'UTC',
      },
    };

    const calendarEvent = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    console.log(`Calendar synced for reminder ${reminder._id}: Event ID: ${calendarEvent.data.id}`);
    return true;
  } catch (error) {
    return false;
  }
};

const sendPushNotification = async (reminder) => {
  // Implement push notification logic if needed
  console.log('Push notification sent for reminder', reminder._id);
  return true;
};

// ----- Reminder Scheduling Functions -----

// Calculate the next reminder time for recurring reminders
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

// Process a reminder: send notification and handle recurring logic
const processReminder = async (reminder) => {
  let notificationSent = false;
  switch (reminder.notificationMethod) {
    case 'email':
      notificationSent = await sendEmailReminder(reminder._id);
      break;
    case 'push':
      notificationSent = await sendPushNotification(reminder);
      break;
    case 'calendar':
      notificationSent = await syncWithCalendar(reminder);
      break;
    default:
      console.log(`Unknown notification method: ${reminder.notificationMethod}`);
      return false;
  }

  if (notificationSent) {
    if (reminder.isRecurring && reminder.recurringFrequency) {
      const nextReminderTime = getNextReminderTime(reminder.reminderTime, reminder.recurringFrequency);
      if (nextReminderTime) {
        reminder.reminderTime = nextReminderTime;
        reminder.notified = false;
        await reminder.save();
        scheduleIndividualReminder(reminder);
      } else {
        reminder.isRecurring = false;
        reminder.notified = true;
        await reminder.save();
      }
    } else {
      reminder.notified = true;
      await reminder.save();
    }
    return true;
  }
  return false;
};

// Schedule an individual job for a given reminder
export const scheduleIndividualReminder = (reminder) => {
  // Convert the reminder time to a UTC Date object.
  const utcTime = moment.utc(reminder.reminderTime).toDate();
  const job = schedule.scheduleJob(utcTime, async () => {
    console.log(`Processing reminder ${reminder._id} scheduled at ${reminder.reminderTime} (UTC)`);
    await processReminder(reminder);
  });
  // Optionally, store the job reference on the reminder if needed:
  reminder.job = job;
};

// Example function to create and schedule a new reminder
export const createReminder = async (reminderData) => {
  const reminder = new Reminder(reminderData);
  await reminder.save();
  scheduleIndividualReminder(reminder);
  return reminder;
};

// Optional: Function to reschedule an existing reminder (if updated)
export const rescheduleReminder = async (reminder) => {
  if (reminder.job && typeof reminder.job.cancel === 'function') {
    reminder.job.cancel();
  }
  scheduleIndividualReminder(reminder);
};

// ----- Initialize Reminder System -----
// At startup, schedule jobs for all pending reminders.
// This is useful to re-establish jobs if the server restarts.
export const initializeReminderSystem = async () => {
  try {
    console.log('Initializing reminder system...');
    // Find all reminders that haven't been notified yet.
    const reminders = await Reminder.find({ notified: false });
    reminders.forEach((reminder) => {
      scheduleIndividualReminder(reminder);
    });
  } catch (error) {
    console.error('Error initializing reminder system:', error.message);
  }
};
