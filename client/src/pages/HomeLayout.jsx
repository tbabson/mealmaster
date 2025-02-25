import { Outlet, useNavigation } from "react-router-dom";
import { Navbar, Footer, Loading } from "../components";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      <Navbar />
      {isLoading ? <Loading /> : <Outlet />}

      <Footer />
    </div>
  );
};
export default HomeLayout;
