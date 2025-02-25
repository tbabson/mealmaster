import { Meal, PageBtnContainer, Loading } from ".";
import { useAllMealsContext } from "../pages/Meals";
import Wrapper from "../assets/wrappers/MealContainer";

const MealContainer = () => {
  const { data } = useAllMealsContext();

  if (!data) {
    return <Loading />;
  }

  const { meals, totalMeals, numOfPages } = data;

  if (meals.length === 0) {
    return (
      <Wrapper>
        <h2>No meals to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="foodCount">
        <h5>
          {totalMeals} meal{meals.length > 1 && "s"} found
        </h5>
      </div>
      <div className="meals">
        {meals.map((meal) => (
          <Meal key={meal._id} {...meal} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer className="pagination" />}
    </Wrapper>
  );
};

export default MealContainer;
