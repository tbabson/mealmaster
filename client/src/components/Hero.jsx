import Wrapper from "../assets/wrappers/Hero";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Wrapper>
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Cook, Schedule, Shop. All in One Place!
          </h1>
          <p className="hero-description">
            Your ultimate kitchen assistant is just a click away.
          </p>
          <div className="hero-button">
            <button type="button" className="btn cook-btn">
              <Link to="/meals">Cook Now!</Link>
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Hero;
