import { useState, useEffect } from "react";

const RecMessage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const updateMessage = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setMessage("Meals below are recommended for your Breakfast");
      } else if (currentHour >= 12 && currentHour < 16) {
        setMessage("Meals below are recommended for your Lunch");
      } else if (currentHour >= 16 && currentHour < 23) {
        setMessage("Meals below are recommended for your Dinner");
      } else {
        setMessage("Check out meals below");
      }
    };

    updateMessage();

    // Update Message every minute
    const intervalId = setInterval(updateMessage, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return { message };
};

export default RecMessage;
