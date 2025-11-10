import { BrowserRouter, Routes, Route } from "react-router-dom";
import Applayout from "./pages/Applayout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import AuthRoutes from "./pages/AuthRoutes";
import ShoppingCart from "./pages/ShoppingCart";
import Wishlist from "./pages/Wishlist";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoutes from "./components/general/ProtectedRoutes";
import User from "./pages/User";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Applayout />}>
          <Route index element={<Home />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="authentication" element={<AuthRoutes />}></Route>
          <Route
            path="cart"
            element={
              <ProtectedRoutes>
                <ShoppingCart />
              </ProtectedRoutes>
            }
          />
          <Route
            path="user"
            element={
              <ProtectedRoutes>
                <User />
              </ProtectedRoutes>
            }
          />
          <Route
            path="wishlist"
            element={
              <ProtectedRoutes>
                <Wishlist />
              </ProtectedRoutes>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* For Toast notifications */}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
