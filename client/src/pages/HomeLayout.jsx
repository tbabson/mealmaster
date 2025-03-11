import { Outlet, useNavigation } from "react-router-dom";
import { Navbar, Footer, Loading } from "../components";
import { useEffect } from "react";
import Wrapper from "../assets/wrappers/HomeLayout";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // Add this effect to reset scroll position when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigation.location]);

  return (
    <Wrapper>
      <div className="layout-container">
        <Navbar />
        <main className="main-content">
          {isLoading ? <Loading /> : <Outlet />}
        </main>
        <Footer />
      </div>
    </Wrapper>
  );
};

export default HomeLayout;
