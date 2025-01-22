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
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-input"
              />
              <button type="submit" className="footer-button">
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
              <Link to="/">
                <Logo />
              </Link>

              <IoCall />
              <p>+234 703 5689 102</p>
              <MdEmail />
              <p>Email: info@mealmaster.com</p>
              <MdLocationOn />
              <p>151, Acme road, Ogba, Lagos.</p>
            </div>
            <div className="social-media">
              <FaFacebook />
              <PiInstagramLogoFill />
              <AiFillTwitterCircle />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Footer;
