import customFetch from "../utils/customFetch";

// Validate form data
export const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.meal) {
        newErrors.meal = "Meal is required";
    }

    if (!formData.reminderTime) {
        newErrors.reminderTime = "Reminder time is required";
    }

    if (!formData.notificationMethod) {
        newErrors.notificationMethod = "Notification method is required";
    }

    return {
        isValid: Object.keys(newErrors).length === 0,
        errors: newErrors,
    };
};

// Create reminder API call
export const createReminder = async (reminderData) => {
    try {
        const response = await customFetch.post(
            "/api/reminders",
            {
                ...reminderData,
                reminderTime: new Date(reminderData.reminderTime).toISOString(),
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Reminder creation error:", error);
        throw error;
    }
};

// Helper function to convert VAPID public key
export const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

// Request notification permission and subscribe to push notifications
export const requestNotificationPermission = async () => {
    if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            try {
                // Subscribe to push notifications
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(
                        process.env.REACT_APP_VAPID_PUBLIC_KEY
                    ),
                });

                // Send subscription to backend
                await customFetch.post(
                    "/api/reminders/subscribe",
                    { subscription },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                return true;
            } catch (error) {
                console.error("Notification subscription error:", error);
                return false;
            }
        }
        return false;
    }
    return false;
};
