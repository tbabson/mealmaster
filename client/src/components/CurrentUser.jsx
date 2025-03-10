import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/currentUser";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdCart } from "react-icons/io";
import { fetchCurrentUser, logoutUser } from "../Features/user/userSlice";

const CurrentUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user data and loading state from Redux
  const { user, loading } = useSelector((state) => state.user);
  const numMealsInCart = useSelector(
    (state) => state.cart?.numItemsInCart || 0
  );

  // Fetch current user on mount if not available
  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  const userName = user
    ? user.fullName || user.name || user.email || "User"
    : "Guest";

  // Navigation handlers
  const handleLoginRedirect = () => navigate("/login");
  const handleRegisterRedirect = () => navigate("/register");

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => {
        console.error("Logout failed:", error);
        navigate("/");
      });
  };

  return (
    <Wrapper>
      <div className="currentUser">
        <div className="currentUserContainer">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p className="user-name">Welcome, {userName}!</p>
              {user ? (
                <div className="logAndCart">
                  <button
                    onClick={handleLogout}
                    className="logout-btn"
                    disabled={loading}
                  >
                    Logout
                  </button>
                  <div className="indicator" onClick={() => navigate("/cart")}>
                    <IoMdCart />
                    <span>{numMealsInCart}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <button onClick={handleLoginRedirect} className="login-btn">
                    Login
                  </button>
                  <button
                    onClick={handleRegisterRedirect}
                    className="login-btn"
                  >
                    Register
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default CurrentUser;
