import { useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/currentUser";

const CurrentUser = () => {
  const { user } = useLoaderData();
  //console.log("User data:", user); // Debug
  const userName = user?.fullName || "Guest";

  if (!user) {
    return (
      <Wrapper>
        <div className="currentUser">
          <p className="user-name">Welcome, Guest!</p>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="currentUser">
        <p className="user-name">Welcome, {userName}!</p>
      </div>
    </Wrapper>
  );
};

export default CurrentUser;
