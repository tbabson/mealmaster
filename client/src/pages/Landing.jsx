import { Hero, RecommendedMeals, LandingSection } from "../components";

const Landing = () => {
  return (
    <div className="landing">
      <Hero />
      <LandingSection />
      <RecommendedMeals />
    </div>
  );
};
export default Landing;
