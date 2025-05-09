import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaBlog,
  FaShoppingCart,
  FaClipboardList,
  FaBell,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import Wrapper from "../assets/wrappers/AdminDashbaord"; // Adjust the path as needed

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.user);

  const adminModules = [
    {
      title: "Meals",
      icon: <FaUtensils className="dashboard-icon" />,
      description: "Manage your meal catalog",
      link: "/admin/meals",
    },
    {
      title: "Blog",
      icon: <FaBlog className="dashboard-icon" />,
      description: "Manage blog posts and articles",
      link: "/admin/blog",
    },
    {
      title: "Cart",
      icon: <FaShoppingCart className="dashboard-icon" />,
      description: "View active shopping carts",
      link: "/admin/cart",
    },
    {
      title: "Orders",
      icon: <FaClipboardList className="dashboard-icon" />,
      description: "View and manage customer orders",
      link: "/admin/orders",
    },
    {
      title: "Reminders",
      icon: <FaBell className="dashboard-icon" />,
      description: "Manage customer reminders",
      link: "/admin/reminders",
    },
    {
      title: "Users",
      icon: <FaUsers className="dashboard-icon" />,
      description: "Manage user accounts",
      link: "/admin/users",
    },
    {
      title: "Reviews",
      icon: <FaStar className="dashboard-icon" />,
      description: "Manage product reviews",
      link: "/admin/reviews",
    },
  ];

  return (
    <Wrapper>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Welcome, {user?.name || "Admin"}</h2>
          <p>Manage all aspects of your business from this central dashboard</p>
        </div>

        <div className="dashboard-modules">
          {adminModules.map((module, index) => (
            <Link to={module.link} key={index} className="dashboard-module">
              <div className="module-icon">{module.icon}</div>
              <div className="module-content">
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminDashboard;
