import { Hero } from "../components";

const Landing = () => {
  return (
    <div className="landing">
      <Hero />
      <div className="landing-sections">
        <div className="section1">
          <img src="" alt="" />
          <div className="section1-writeup">
            <h3>Master the Art of Cooking with Ease!</h3>
            <p>Learn step-by-step how to prepare mouthwatering meals.</p>
          </div>
        </div>
        <div className="section2">
          <img src="" alt="" />
          <div className="section2-writeup">
            <h3>Never Miss a Cooking Moment!</h3>
            <p>Set reminders and keep your kitchen game strong.</p>
          </div>
        </div>
        <div className="section3">
          <img src="" alt="" />
          <div className="section3-writeup">
            <h3>Your Meal, Perfectly Scheduled!</h3>
            <p>Plan your meals effortlessly and stay on track.</p>
          </div>
        </div>
        <div className="section4">
          <img src="" alt="" />
          <div className="section4-writeup">
            <h3>Shop Ingredients Without the Hassle!</h3>
            <p>Get fresh, quality ingredients delivered to your door.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
