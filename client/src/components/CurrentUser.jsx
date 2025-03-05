import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/currentUser";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdCart } from "react-icons/io";
import { useCurrentUser } from "../actionsAndLoaders/CurrentUserLoader";
import { logoutUser } from "../Features/user/userSlice";

const CurrentUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useCurrentUser();

  // Correctly using the state property name "numItemsInCart"
  const numMealsInCart = useSelector(
    (state) => state.cart?.numItemsInCart || 0
  );

  const userName = user?.fullName || "Guest";

  const handleLoginRedirect = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleRegisterRedirect = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <Wrapper>
      <div className="currentUser">
        <div className="currentUserContainer">
          <p className="user-name">Welcome, {userName}!</p>
          {user ? (
            <div className="logAndCart">
              <button
                onClick={() => dispatch(logoutUser())}
                className="logout-btn"
              >
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
