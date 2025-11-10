import Header from "../components/appLayout/header/Header";
import Footer from "../components/appLayout/Footer";
import Banner from "../components/appLayout/banner/Banner";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { isLoggedin } from "../features/authenticationSlice";
import { useAppDispatch } from "../hooks/redux";

function Applayout() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/authentication");

  useEffect(() => {
    dispatch(isLoggedin());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Header />}
      {!isAuthPage && <Banner />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default Applayout;
