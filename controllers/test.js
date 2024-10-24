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

