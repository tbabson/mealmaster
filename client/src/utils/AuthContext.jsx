import { createContext, useContext, useState, useEffect } from "react";
import customFetch from "./customFetch";
import { toast } from "react-toastify";

// Create the authentication context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user from token
  const fetchUser = async () => {
    try {
      const response = await customFetch.get("/users/currentuser", {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (error) {
      toast.error("user not login" || error?.response?.data?.msg);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Logout function
  const logoutUser = async () => {
    try {
      await customFetch.get("/auth/logout", { withCredentials: true });
      setUser(null);
      window.location.reload();
      toast.success("Logout successful");
    } catch (error) {
      const errorMessage =
        "Something went wrong. Please try again." || error?.response?.data?.msg;
      toast.error(errorMessage);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, fetchUser, logoutUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = () => useContext(AuthContext);
