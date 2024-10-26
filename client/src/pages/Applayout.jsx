import Header from "../components/appLayout/header/Header";
import Footer from "../components/appLayout/Footer";

import Banner from "../components/appLayout/banner/Banner";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { isLoggedin } from "../features/authenticationSlice";
import { useDispatch } from "react-redux";

function Applayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedin());
  }, [dispatch]);

  return (
    <div className="max-w-full">
      <Header />
      <Banner />
      <Outlet /> {/* Home | ProductDetails | login | cart | wishlist */}
      <Footer />
    </div>
  );
}

export default Applayout;
