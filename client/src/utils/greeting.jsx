import React, { useState, useEffect } from "react";

const Greeting = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Good morning,");
      } else if (currentHour >= 12 && currentHour < 16) {
        setGreeting("Good afternoon,");
      } else if (currentHour >= 16 && currentHour < 23) {
        setGreeting("Good evening,");
      } else {
        setGreeting("Good day,");
      }
    };

    updateGreeting();

    // Update greeting every minute
    const intervalId = setInterval(updateGreeting, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return <h3>{greeting}</h3>;
};

export default Greeting;
