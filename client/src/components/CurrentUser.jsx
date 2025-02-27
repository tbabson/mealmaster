import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/currentUser";
import { useState, useEffect, useCallback } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { IoMdCart } from "react-icons/io";

const CurrentUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Correctly using the state property name "numItemsInCart"
  const numMealsInCart = useSelector(
    (state) => state.cart?.numItemsInCart || 0
  );

  useEffect(() => {
    let isMounted = true;
    const fetchCurrentUser = async () => {
      try {
        const response = await customFetch.get("/users/currentuser");
        if (isMounted) {
          setUser(response.data.user);
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
        }
      }
    };

    fetchCurrentUser();
    return () => {
      isMounted = false;
    };
  }, []);

  const userName = user?.fullName || "Guest";

  const handleLoginRedirect = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleRegisterRedirect = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    try {
      await customFetch.get("/auth/logout", { withCredentials: true });
      setUser(null);
      toast.success("Logout successful");
      navigate(0); // Refresh the page
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Something went wrong.");
    }
  }, [navigate]);

  return (
    <Wrapper>
      <div className="currentUser">
        <div className="currentUserContainer">
          <p className="user-name">Welcome, {userName}!</p>
          {user ? (
            <div className="logAndCart">
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
              <div className="indicator">
                <IoMdCart />
                <span>{numMealsInCart}</span>
              </div>
            </div>
          ) : (
            <div>
              <button onClick={handleLoginRedirect} className="login-btn">
                Login
              </button>
              <button onClick={handleRegisterRedirect} className="login-btn">
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default CurrentUser;
