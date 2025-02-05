import { Logo } from "../components";
import Wrapper from "../assets/wrappers/Footer";
import { Link, NavLink, Form } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <Wrapper>
      <div className="footer-container">
        <div className="footer">
          <div className="footer-section">
            <h3 className="footer-title">Get best meal recommendation</h3>
            <p className="footer-writeup">
              Get exclusive meal recommendation from our chefs right in your
              inbox. Subscribe for our newsletter now.
            </p>
            <Form className="footer-form">
              <label htmlFor="email" className="sr-only"></label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="footer-input"
                aria-label="Email address"
                required
              />
              <button type="submit" className="btn-footer">
                subscribe
              </button>
            </Form>
          </div>
          <div className="footer-section footer-menu">
            <h3 className="footer-title">Menu</h3>
            <NavLink to="/" className="footer-link">
              Home
            </NavLink>
            <NavLink to="/meals" className="footer-link">
              Meals
            </NavLink>
            <NavLink to="/cart" className="footer-link">
              Cart
            </NavLink>
            <NavLink to="/profile" className="footer-link">
              Profile
            </NavLink>
            <NavLink to="/blog" className="footer-link">
              Blog
            </NavLink>
          </div>
          <div className="footer-section footer-contact">
            <div className="footer-heading">
              <h3 className="footer-title">Talk to us</h3>
            </div>
            <div className="footer-logo">
              <Link to="/" className="logo">
                <Logo />
              </Link>
            </div>
            <div className="footer-text">
              <p>
                <IoCall className="icon" />
                +234 703 5689 102
              </p>

              <p>
                <MdEmail className="icon" />
                Email: info@mealmaster.com
              </p>

              <p>
                <MdLocationOn className="icon" />
                151, Acme road, Ogba, Lagos.
              </p>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="footer-bottom">
          <div className="rite-reserved">
            <p>&copy; 2025 MealMaster. All rights reserved.</p>
          </div>
          <div className="social-media">
            <Link
              to="https://www.facebook.com"
              aria-label="Visit our Facebook page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </Link>
            <Link
              to="https://www.instagram.com"
              aria-label="Visit our Instagram page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PiInstagramLogoFill />
            </Link>
            <Link
              to="https://www.x.com"
              aria-label="Visit our Twitter page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillTwitterCircle />
            </Link>
          </div>
          <div className="terms-conditions">
            <Link to="/#" className="terms-link">
              Terms & Conditions
            </Link>
            <Link to="/#" className="terms-link">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Footer;
