import { useDispatch } from "react-redux";
import { subscribeToPushNotifications } from "../Features/Reminder/reminderSlice";

const enablePushNotifications = async (dispatch) => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          "BLYtSGQhEAXCSh4f4oivVIMDdhnx-bJI3tClaC8CK9BccN9Hxsy6WbRjdoyFyCzwUJXyZX6wCJJb18GLtDTZhWg", // Replace with your VAPID public key
      });

      // Format the subscription data according to the schema
      const subscriptionData = {
        endpoint: pushSubscription.endpoint,
        keys: {
          p256dh: btoa(
            String.fromCharCode.apply(
              null,
              new Uint8Array(pushSubscription.getKey("p256dh"))
            )
          ),
          auth: btoa(
            String.fromCharCode.apply(
              null,
              new Uint8Array(pushSubscription.getKey("auth"))
            )
          ),
        },
      };

      // Dispatch the subscription to the server
      await dispatch(subscribeToPushNotifications(subscriptionData));
      return true;
    } catch (error) {
      console.error("Failed to subscribe to push notifications:", error);
      return false;
    }
  } else {
    console.error("Push notifications are not supported");
    return false;
  }
};

const PushNotificationButton = () => {
  const dispatch = useDispatch();

  const handleEnablePushNotifications = async () => {
    const success = await enablePushNotifications(dispatch);
    if (success) {
      alert("Push notifications enabled successfully!");
    } else {
      alert("Failed to enable push notifications. Please try again.");
    }
  };

  return (
    <button onClick={handleEnablePushNotifications} type="button">
      Enable Push Notifications
    </button>
  );
};

export default PushNotificationButton;
