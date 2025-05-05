import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../Features/user/userSlice"; // Update this path as needed
import {
  FaSignOutAlt,
  FaUtensils,
  FaBlog,
  FaShoppingCart,
  FaClipboardList,
  FaBell,
  FaStar,
  FaUsers,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import Wrapper from "../assets/wrappers/Admin";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate("/admin"); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Wrapper>
      <main className="admin-main">
        <nav className="nav-container">
          <div className="nav-center">
            <div className="nav-header">
              <div className="logo-container">
                <h1 className="admin-title">Admin Dashboard</h1>
              </div>
              <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
              <div className="nav-links">
                <NavLink
                  to="/admin/meals"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <FaUtensils className="icon-spacing" /> Meals
                </NavLink>
                <NavLink
                  to="/admin/blog"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <FaBlog className="icon-spacing" /> Blog
                </NavLink>
                <NavLink
                  to="/admin/cart"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <FaShoppingCart className="icon-spacing" /> Cart
                </NavLink>
                <NavLink
                  to="/admin/orders"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <FaClipboardList className="icon-spacing" /> Orders
                </NavLink>
                <NavLink
                  to="/admin/reminders"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <FaBell className="icon-spacing" /> Reminders
                </NavLink>
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <FaUsers className="icon-spacing" /> Users
                </NavLink>
                <NavLink
                  to="/admin/reviews"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <FaStar className="icon-spacing" /> Reviews
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="logout-btn desktop-logout"
                >
                  <FaSignOutAlt className="icon-spacing" /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="mobile-menu">
              <NavLink
                to="/admin/meals"
                className={({ isActive }) =>
                  isActive ? "mobile-link active" : "mobile-link"
                }
              >
                <FaUtensils className="icon-spacing" /> Meals
              </NavLink>
              <NavLink
                to="/admin/blog"
                className={({ isActive }) =>
                  isActive ? "mobile-link active" : "mobile-link"
                }
              >
                <FaBlog className="icon-spacing" /> Blog
              </NavLink>
              <NavLink
                to="/admin/cart"
                className={({ isActive }) =>
                  isActive ? "mobile-link active" : "mobile-link"
                }
              >
                <FaShoppingCart className="icon-spacing" /> Cart
              </NavLink>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  isActive ? "mobile-link active" : "mobile-link"
                }
              >
                <FaClipboardList className="icon-spacing" /> Orders
              </NavLink>
              <NavLink
                to="/admin/reminders"
                className={({ isActive }) =>
                  isActive ? "mobile-link active" : "mobile-link"
                }
              >
                <FaBell className="icon-spacing" /> Reminders
              </NavLink>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  isActive ? "mobile-link active" : "mobile-link"
                }
              >
                <FaUsers className="icon-spacing" /> Users
              </NavLink>
              <NavLink
                to="/admin/reviews"
                className={({ isActive }) =>
                  isActive ? "mobile-link active" : "mobile-link"
                }
              >
                <FaStar className="icon-spacing" /> Reviews
              </NavLink>
              <button onClick={handleLogout} className="mobile-logout">
                <FaSignOutAlt className="icon-spacing" /> Logout
              </button>
            </div>
          )}
        </nav>

        <div className="content-container">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default Admin;
