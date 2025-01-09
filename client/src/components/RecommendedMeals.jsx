import RecMessage from "../utils/recommendedText";
import { SectionTitle, RecommendedMealsContainer } from "../components";

const RecommendedMeals = () => {
  return (
    <div>
      <SectionTitle
        title="recommended Meals"
        description={RecMessage().message}
      />
      <RecommendedMealsContainer />
    </div>
  );
};

export default RecommendedMeals;
