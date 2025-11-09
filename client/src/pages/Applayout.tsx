import Header from "../components/appLayout/header/Header";
import Footer from "../components/appLayout/Footer";
import Banner from "../components/appLayout/banner/Banner";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { isLoggedin } from "../features/authenticationSlice";
import { useAppDispatch } from "../hooks/redux";

function Applayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isLoggedin());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Banner />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Applayout;
