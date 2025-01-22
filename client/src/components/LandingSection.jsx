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
              <p>
                Learn to cook mouthwatering meals with ease! Our step-by-step
                guide covers everything from selecting fresh ingredients to
                mastering simple techniques. Whether you're a beginner or
                seasoned cook, our tips will bring out your inner chef!
              </p>
              {/* <p>Learn step-by-step how to prepare mouthwatering meals.</p> */}
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
              <p>
                Stay organized in the kitchen with smart reminders! Keep track
                of cooking times, prep steps, and tasks to ensure every dish
                turns out perfect. Save time, reduce stress, and elevate your
                kitchen game with ease!
              </p>
              {/* <p>Set reminders and keep your kitchen game strong.</p> */}
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
              <p>
                Simplify your meal planning and make healthy eating a breeze!
                Create a weekly menu, shop efficiently, and avoid last-minute
                stress. Stay organized and enjoy delicious, balanced meals every
                day.
              </p>
              {/* <p>Plan your meals effortlessly and stay on track.</p> */}
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
              <p>
                Enjoy the convenience of fresh, high-quality ingredients
                delivered straight to your home! Save time on shopping while
                ensuring you always have the best for your meals. Cooking
                delicious dishes has never been easier or more hassle-free!
              </p>
              <p>Get fresh, quality ingredients delivered to your door.</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default LandingSection;
