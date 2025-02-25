import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/currentUser";
import { useState, useEffect } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { IoMdCart } from "react-icons/io";

const CurrentUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const numMealsInCart = useSelector(
    (state) => state.cart?.numItemsInCart || 0
  );

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await customFetch.get("/users/currentuser");
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  const userName = user?.fullName || "Guest";

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const handleLogout = async () => {
    try {
      await customFetch.get("/auth/logout", { withCredentials: true });
      setUser(null); // Reset user state
      toast.success("Logout successful");
      navigate(0); // Refresh page smoothly
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Something went wrong.");
    }
  };

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

// import { useNavigate } from "react-router-dom";
// import Wrapper from "../assets/wrappers/currentUser";
// import { useAuth } from "../utils/AuthContext";

// const CurrentUser = () => {
//   const { user, logoutUser } = useAuth();
//   const navigate = useNavigate();

//   const handleLoginRedirect = () => {
//     navigate("/login");
//   };

//   return (
//     <Wrapper>
//       <div className="currentUser">
//         <div className="currentUserContainer">
//           <p className="user-name">Welcome, {user?.fullName || "Guest"}!</p>
//           {user ? (
//             <button onClick={logoutUser} className="logout-btn">
//               Logout
//             </button>
//           ) : (
//             <button onClick={handleLoginRedirect} className="login-btn">
//               Login
//             </button>
//           )}
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default CurrentUser;
