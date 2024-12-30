import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import categoryReducer from "./features/categoriesSlice";
import productDetailsReducer from "./features/productDetailsSlice";
import authenticationReducer from "./features/authenticationSlice";
import shoppingCartReducer from "./features/shoppingCartSlice";
import wishlistReducer from "./features/wishlistSlice";

// Redux store
const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    productDetails: productDetailsReducer,
    authentication: authenticationReducer,
    shoppingCart: shoppingCartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
