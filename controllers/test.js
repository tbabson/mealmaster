// service-worker.js

self.addEventListener('push', function (event) {
  const data = event.data.json();

  const options = {
    body: data.body,
    icon: 'images/icon.png', // Replace with your icon
    badge: 'images/badge.png', // Replace with your badge image
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

//Request User Permission

if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(function (registration) {
      console.log('Service Worker registered with scope:', registration.scope);

      return Notification.requestPermission();
    })
    .then(function (permission) {
      if (permission === 'granted') {
        console.log('Notification permission granted.');

        // Subscribe the user to push notifications
        return subscribeUserToPush(registration);
      } else {
        console.error('Unable to get permission to notify.');
      }
    });
}

//Subscribe to Push Notifications

function subscribeUserToPush(registration) {
  const applicationServerKey = urlB64ToUint8Array('<Your Public VAPID Key>'); // Replace with your VAPID public key
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey,
  }).then(function (subscription) {
    console.log('User is subscribed:', subscription);

    // You can now send the subscription object to your server
    // subscription.endpoint contains the endpoint
    // subscription.keys.p256dh contains the public key
    // subscription.keys.auth contains the auth secret
    saveSubscriptionToServer(subscription);
  }).catch(function (err) {
    console.log('Failed to subscribe the user: ', err);
  });
}

// Convert URL-safe base64 string to Uint8Array
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

