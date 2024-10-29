import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../utils/apiRequest";
import { BASE_URL } from "../config/config";

// Initial state of the shopping cart
const initialState = {
  cartProducts: [], // Array to hold the products added to the cart
  shipping: 0, // Shipping cost for the cart
  cartId: "", // Unique identifier for the cart
  error: "", // Stores any error message during cart operations
  status: "", // Tracks request status: "idle" | "loading" | "success" | "fail"
};

// Action to load cart products from localStorage based on user ID
export const loadCart = createAsyncThunk(
  "shoppingCart/loadCart",
  async (_, { rejectWithValue }) => {
    try {
      // Request to load user's cart data
      return await apiRequest(`${BASE_URL}/cart`, "GET");
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Action to add a product to the cart
export const addProductToCart = createAsyncThunk(
  "shoppingCart/addProductToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      // API request to add a product with specified quantity
      return await apiRequest(`${BASE_URL}/cart/`, "POST", {
        productId,
        quantity,
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Action to remove a product from the cart
export const removeProduct = createAsyncThunk(
  "shoppingCart/removeProduct",
  async (productId, { rejectWithValue }) => {
    try {
      // API request to delete a product from the cart
      return await apiRequest(`${BASE_URL}/cart/`, "DELETE", { productId });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Action to update the quantity of a specific product in the cart
export const updateProductQuantity = createAsyncThunk(
  "shoppingCart/updateProductQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      // API request to change the quantity of a product in the cart
      return await apiRequest(`${BASE_URL}/cart/`, "PATCH", {
        productId,
        quantity,
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Shopping cart slice containing actions and state reducers
const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    // Updates the shipping cost in the cart
    updateShipping(state, action) {
      state.shipping = action.payload;
    },

    // Resets the cart state to initial values (e.g., on logout or cart clear)
    resetCart(state) {
      state.cartProducts = initialState.cartProducts;
      state.shipping = initialState.shipping;
      state.cartId = initialState.cartId;
      state.error = initialState.error;
      state.status = initialState.status;
    },
  },

  // Handles async actions for cart operations
  extraReducers: (builder) => {
    builder
      // Sets cart data and cart ID when the loadCart action is fulfilled
      .addCase(loadCart.fulfilled, (state, action) => {
        state.status = "success";
        state.cartId = action.payload?.data?.cart?._id;
        state.cartProducts = action.payload?.data?.cart?.cartItems;
      })

      // Updates cart products on successful addition
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.cartProducts = action.payload?.data?.cart?.cartItems;
      })
      // Updates cart products after removing a product
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.cartProducts = action.payload?.data?.cart?.cartItems;
      })
      // Updates cart products after modifying product quantity
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.cartProducts = [...(action.payload?.data?.cart?.cartItems || [])];
      })
      // Sets status to "loading" for any pending async cart action
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = "";
        }
      )
      // Sets status to "fail" and logs error if any cart async action is rejected
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "fail";
          state.error = action.payload || action.error.message;
        }
      );
  },
});

// Export actions for use in the application
export const { updateShipping, resetCart } = shoppingCartSlice.actions;

// Export reducer for use in the Redux store
export default shoppingCartSlice.reducer;
