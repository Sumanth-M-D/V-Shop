import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../config/config";

const initialState = {
  productId: null,
  productData: {},
  status: "idle", // idle | loading | success | fail
  error: "",
  quantity: 1,
};

// Async action to fetch product details by product ID
export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchData",
  async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    const data = await res.json();
    console.log(data);
    return data.data.product;
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,

  reducers: {
    // Sets the product ID in the state when a new product is selected
    setProductId(state, action) {
      state.productId = action.payload;
    },

    // Manually sets the product data, useful when the product data is already available in local state
    setProductData(state, action) {
      state.productData = { ...action.payload };
      state.status = "success";
    },

    // Updates the product quantity, ensuring it doesn't go below 1
    updateProductQuantity(state, action) {
      if (action.payload <= 0) return;
      state.quantity = action.payload;
    },

    // Resets the product details to the initial state, typically on component unmount
    resetProductDetails() {
      return initialState;
    },
  },

  // Handling the async action for fetching product details
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = "success";
        state.productData = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.status = "fail";
        state.error = "Unable to load product data. Please try again later";
      });
  },
});

export const {
  setProductId,
  setProductData,
  updateProductQuantity,
  resetProductDetails,
} = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
