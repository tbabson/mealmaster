import { Outlet } from "react-router-dom";
import { CurrentUser } from "../components";

const HomeLayout = () => {
  return (
    <div>
      <CurrentUser />
      <nav>navbar</nav>
      <Outlet />
    </div>
  );
};
export default HomeLayout;
