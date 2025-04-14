// This is the service worker file for handling push notifications

self.addEventListener('push', (event) => {
    const data = event.data.json();

    const options = {
        body: data.body,
        icon: '/public/favchrome.png', // Path to an icon for the notification
        badge: '/public/favicon.ico', // Path to a badge icon
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});