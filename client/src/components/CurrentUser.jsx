import { useLoaderData, useSubmit, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/currentUser";
import { useState, useEffect } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

//import { useMealsContext } from "../pages/Meals";

const CurrentUser = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [isLoggedOut, setIsLoggedOut] = useState(false); // State to track if user is logged out
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await customFetch.get("/users/currentuser", {
          withCredentials: true, // Include cookies for authentication
        });
        setUser(response.data.user);
      } catch (error) {
        //toast.error("user not login" || error?.response?.data?.msg);
        return { user: null };
      }
    };

    fetchCurrentUser();
  }, []);

  const userName = user?.fullName || "Guest";

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to the login page
  };

  if (!user) {
    return (
      <Wrapper>
        <div className="currentUser">
          <div className="currentUserContainer">
            <p className="user-name">Welcome, Guest!</p>
            <button onClick={handleLoginRedirect} className="login-btn">
              Login
            </button>
          </div>
        </div>
      </Wrapper>
    );
  }

  const handleLogout = async () => {
    try {
      await customFetch.get("/auth/logout", {}, { withCredentials: true });
      window.location.reload(); // Refresh page after logout
      toast.success("Logout successful");
    } catch (error) {
      const errorMessage =
        "Something went wrong. Please try again." || error?.response?.data?.msg;
      toast.error(errorMessage);
      return null;
    }
  };

  return (
    <Wrapper>
      <div className="currentUser">
        <div className="currentUserContainer">
          <p className="user-name">Welcome, {userName}!</p>
          {isLoggedOut ? (
            <button onClick={handleLoginRedirect} className="login-btn">
              Login
            </button>
          ) : (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
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
