import Wrapper from "../assets/wrappers/Hero";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Wrapper>
      <div className="hero">
        <div className="hero-content">
          <div className="hero-image">
            <img
              src="https://res.cloudinary.com/dwrmehhg3/image/upload/v1734953363/mealmaster/lsldkvataufcy4d0knd2.webp"
              alt="cook"
            />
          </div>
          <div className="hero-writeup">
            <h1 className="hero-title">
              Cook, Schedule & Shop. All in One Place!
            </h1>
            <p className="hero-description">
              Your ultimate kitchen assistant is just a click away.
            </p>
          </div>
        </div>
        <div className="hero-button">
          <button type="button" className="btn cook-btn">
            <Link to="/meals">Start Cooking!</Link>
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
export default Hero;
