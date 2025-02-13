import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { CurrentUser, Logo } from "../components";
import { IoMenu, IoClose } from "react-icons/io5";
import Wrapper from "../assets/wrappers/Navbar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Wrapper>
      <nav>
        <CurrentUser />
        <div className="nav-center">
          <div className="nav-display">
            <div className="logo">
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <button className="nav-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>
          <div
            className={`nav-links-container ${isMenuOpen ? "show-menu" : ""}`}
          >
            <div className="nav-links">
              {/* <NavLink to="/" className="nav-link" onClick={toggleMenu}>
                Home
              </NavLink> */}
              <NavLink to="/" className="nav-link" onClick={toggleMenu}>
                Home
              </NavLink>
              <NavLink to="/cart" className="nav-link" onClick={toggleMenu}>
                Cart
              </NavLink>
              <NavLink to="/profile" className="nav-link" onClick={toggleMenu}>
                Profile
              </NavLink>
              <NavLink to="/blog" className="nav-link" onClick={toggleMenu}>
                Blog
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Navbar;
