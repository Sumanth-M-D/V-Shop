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

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
