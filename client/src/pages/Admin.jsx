import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Features/user/userSlice";
import {
  FaSignOutAlt,
  FaUtensils,
  FaBlog,
  FaShoppingCart,
  FaClipboardList,
  FaBell,
  FaStar,
  FaUsers,
  FaBars, // Add hamburger menu icon
  FaTimes, // Add close icon
} from "react-icons/fa";
import { BiSolidDashboard as FaDashboard } from "react-icons/bi";
import { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/Admin";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  // State for mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if current path is admin login page
  const isLoginPage = location.pathname === "/admin";

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate("/admin"); // Redirect to login page after logout
        setIsSidebarOpen(false); // Close sidebar on logout
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when navigating (especially on mobile)
  const handleNavLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  // If not on login page and not logged in as admin, redirect to login
  useEffect(() => {
    if (!isLoginPage && (!user || user.role !== "admin")) {
      navigate("/admin", { state: { from: location.pathname } });
    }
  }, [user, navigate, location.pathname, isLoginPage]);

  // For login page, just render the Outlet (which will be AdminLogin)
  if (isLoginPage) {
    return <Outlet />;
  }

  // For other admin pages, render the full dashboard with sidebar nav
  return (
    <Wrapper>
      <button
        className="toggle-btn"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <main className="admin-main">
        <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="logo-container">
            <h1 className="admin-title">Admin Dashboard</h1>
          </div>
          <nav className="nav-links">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavLinkClick}
            >
              <FaDashboard className="icon-spacing" /> Dashboard
            </NavLink>
            <NavLink
              to="/admin/meals"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavLinkClick}
            >
              <FaUtensils className="icon-spacing" /> Meals
            </NavLink>
            <NavLink
              to="/admin/blog"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavLinkClick}
            >
              <FaBlog className="icon-spacing" /> Blog
            </NavLink>
            <NavLink
              to="/admin/cart"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavLinkClick}
            >
              <FaShoppingCart className="icon-spacing" /> Cart
            </NavLink>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavLinkClick}
            >
              <FaClipboardList className="icon-spacing" /> Orders
            </NavLink>
            <NavLink
              to="/admin/reminders"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavLinkClick}
            >
              <FaBell className="icon-spacing" /> Reminders
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavLinkClick}
            >
              <FaUsers className="icon-spacing" /> Users
            </NavLink>
            <NavLink
              to="/admin/reviews"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavLinkClick}
            >
              <FaStar className="icon-spacing" /> Reviews
            </NavLink>
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt className="icon-spacing" /> Logout
            </button>
          </nav>
        </aside>

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
