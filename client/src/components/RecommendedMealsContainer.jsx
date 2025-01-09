import { Link, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/RecommendedMealsContainer";

const RecommendedMealsContainer = () => {
  const { meals } = useLoaderData(); // meals is an array

  // Get the current hour
  const currentHour = new Date().getHours();

  // Determine mealType based on the time of the day
  let mealType;
  if (currentHour >= 6 && currentHour < 12) {
    mealType = "Breakfast";
  } else if (currentHour >= 12 && currentHour < 17) {
    mealType = "Lunch";
  } else {
    mealType = "Dinner";
  }

  // Filter meals with recommended set to true and match mealType
  const recommendedMeals = meals.meals.filter(
    (meal) => meal.isRecommended === true && meal.mealType === mealType
  );

  if (!recommendedMeals || recommendedMeals.length === 0) {
    return <p>No recommended meals available for {mealType}</p>;
  }

  return (
    <Wrapper>
      <div className="recommended-meals-container">
        <h3>Recommended {mealType} Meals</h3>
        {recommendedMeals.map((meal) => {
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
