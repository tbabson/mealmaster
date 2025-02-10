import Wrapper from "../assets/wrappers/Hero";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Wrapper>
      <div className="hero">
        <div className="hero-content">
          <div className="hero-writeup">
            <p className="hero-description">
              Tired of eating the same food all the time? We got you covered!
            </p>
            <h1 className="hero-title">
              Cook, Schedule & Shop. All in One Place!
            </h1>
            <p className="hero-description">
              Your ultimate meal assistant is just a click away.
            </p>
            <div className="hero-button">
              <button type="button" className="btn cook-btn">
                <Link to="/meals">Start Cooking!</Link>
              </button>
            </div>
          </div>
          {/* <div className="hero-image">
            <img
              src="https://res.cloudinary.com/dwrmehhg3/image/upload/v1738673515/mealmaster/clwzrye8budtmhdco0af.png"
              alt="cook"
            />
          </div> */}
        </div>
      </div>
    </Wrapper>
  );
};
export default Hero;
