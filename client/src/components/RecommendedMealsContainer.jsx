import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RecommendedMealsContainer";
import { useState, useEffect } from "react";
import { useAllMealsContext } from "../pages/Meals";

const RecommendedMealsContainer = () => {
  const { data } = useAllMealsContext();
  const { meals } = data;
  const [shuffledMeals, setShuffledMeals] = useState([]);
  const [mealType, setMealType] = useState("");

  // Function to determine meal type based on the time of day
  const getMealType = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) return "Breakfast";
    if (currentHour >= 12 && currentHour < 17) return "Lunch";
    return "Dinner";
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Get current meal type
    const type = getMealType();
    setMealType(type);

    // Filter meals based on meal type and recommendation status
    const filteredMeals = meals.filter(
      (meal) => meal.isRecommended === true && meal.mealType === type
    );

    // Shuffle meals
    setShuffledMeals(shuffleArray(filteredMeals).slice(0, 5)); // Limit to 5 meals

    // Set an interval to reshuffle meals every 30 minutes
    const interval = setInterval(() => {
      setShuffledMeals(shuffleArray(filteredMeals).slice(0, 5)); // Limit to 5 meals
    }, 30 * 60 * 1000); // 30 minutes in milliseconds

    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, [meals]);

  if (!shuffledMeals || shuffledMeals.length === 0) {
    return <p>No recommended meals available for {mealType}</p>;
  }

  return (
    <Wrapper>
      <div className="recommended-meals-container">
        {/* <h3>Recommended {mealType} Meals</h3> */}
        {shuffledMeals.map((meal) => {
          const { _id, image, name, cuisine } = meal;
          return (
            <Link key={_id} to={`/meals/${_id}`} className="recommended-meal">
              <figure>
                <img src={image} alt={name} />
              </figure>
              <div className="meal-details">
                <h2>{name}</h2>
                <p>{cuisine}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default RecommendedMealsContainer;
