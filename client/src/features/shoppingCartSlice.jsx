import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../utils/apiRequest";
import { BASE_URL } from "../config/config";

// Initial state of the shopping cart
const initialState = {
  cartProducts: [],
  shipping: 0,
  cartId: "",
  error: "",
  status: "",
};

// Action to load cart products from localStorage based on user ID
export const loadCart = createAsyncThunk(
  "shoppingCart/loadCart",
  async (_, { rejectWithValue }) => {
    try {
      return await apiRequest(`${BASE_URL}/cart/`, "GET", null, true);
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
      return await apiRequest(
        `${BASE_URL}/cart/`,
        "POST",
        { productId, quantity },
        true
      );
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
      return await apiRequest(
        `${BASE_URL}/cart/`,
        "DELETE",
        { productId },
        true
      );
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
      return await apiRequest(
        `${BASE_URL}/cart/`,
        "PATCH",
        { productId, quantity },
        true,
        rejectWithValue
      );
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Create a slice for the shopping cart
const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    // Action to update the shipping cost
    updateShipping(state, action) {
      state.shipping = action.payload;
    },
    resetCart(state) {
      state.cartProducts = initialState.cartProducts;
      state.shipping = initialState.shipping;
      state.cartId = initialState.cartId;
      state.error = initialState.error;
      state.status = initialState.status;
    },
  },

  extraReducers: (builder) => {
    // Pending, Fulfilled & rejected state handling for createUser async action
    builder
      .addCase(loadCart.fulfilled, (state, action) => {
        state.status = "success";
        state.cartId = action.payload?.data?.cart?._id;
        state.cartProducts = action.payload?.data?.cart?.cartItems;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.cartProducts = action.payload?.data?.cart?.cartItems;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.cartProducts = action.payload?.data?.cart?.cartItems;
      })
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.cartProducts = [...(action.payload?.data?.cart?.cartItems || [])];
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = "";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "fail";
          state.error = action.payload || action.error.message;
        }
      );
  },
});

export const { updateShipping, resetCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
