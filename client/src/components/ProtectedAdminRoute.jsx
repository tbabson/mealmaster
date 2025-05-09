import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../Features/user/userSlice";
import Loading from "./Loading";

const ProtectedAdminRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const location = useLocation();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(fetchCurrentUser()).unwrap();
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  // Show loading state while initializing or fetching user details
  if (isInitializing || loading) {
    return <Loading />;
  }

  // If user exists but is not admin, redirect to /admin
  if (user && user.role !== "admin") {
    return <Navigate to="/admin" replace />;
  }

  // If no user at all, redirect to admin login page
  if (!user) {
    return (
      <Navigate
        to="/admin/login"
        state={{ from: "/admin/dashboard" }}
        replace
      />
    );
  }

  // User exists and is admin, render the protected component
  return children;
};

export default ProtectedAdminRoute;
