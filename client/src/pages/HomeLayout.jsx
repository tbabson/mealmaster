import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";

const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default HomeLayout;
