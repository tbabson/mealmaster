import { SectionTitle } from "../components";
import Wrapper from "../assets/wrappers/LandingSection";

const LandingSection = () => {
  return (
    <Wrapper>
      <div className="landing-sections">
        <div className="section-title">
          <SectionTitle
            title="what we offer"
            description="Discover the amazing features of Meal Master"
          />
        </div>
        <div className="section-container">
          <div className="section">
            <img
              src="https://res.cloudinary.com/dwrmehhg3/image/upload/v1736521190/mealmaster/w2auzej3ff9fixs8hhdx.jpg"
              alt="cook"
            />
            <div className="section-writeup">
              <h3>Master the Art of Cooking with Ease!</h3>
              <p>Learn step-by-step how to prepare mouthwatering meals.</p>
            </div>
          </div>
          <div class="divider"></div>

          <div className="section">
            <img
              src="https://res.cloudinary.com/dwrmehhg3/image/upload/v1736522927/mealmaster/dfxva3bhy0ockesdqbzq.jpg"
              alt="cooking reminder"
            />
            <div className="section-writeup">
              <h3>Never Miss a Cooking Moment!</h3>
              <p>Set reminders and keep your kitchen game strong.</p>
            </div>
          </div>
          <div class="divider"></div>

          <div className="section">
            <img
              src="https://res.cloudinary.com/dwrmehhg3/image/upload/v1736523833/mealmaster/wdff8rwbvtz5zf1n3ymq.jpg"
              alt="meal schedule"
            />
            <div className="section-writeup">
              <h3>Your Meal, Perfectly Scheduled!</h3>
              <p>Plan your meals effortlessly and stay on track.</p>
            </div>
          </div>
          <div class="divider"></div>

          <div className="section">
            <img
              src="https://res.cloudinary.com/dwrmehhg3/image/upload/v1736524922/mealmaster/nythkwt83jo1bmwhwnqf.jpg"
              alt="Shop ingredients"
            />
            <div className="section-writeup">
              <h3>Shop Ingredients Without the Hassle!</h3>
              <p>Get fresh, quality ingredients delivered to your door.</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default LandingSection;
