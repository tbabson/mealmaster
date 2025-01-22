import { Hero, RecommendedMeals, LandingSection, Footer } from "../components";

const Landing = () => {
  return (
    <div className="landing">
      <Hero />
      <LandingSection />
      <RecommendedMeals />
      <Footer />
    </div>
  );
};
export default Landing;
