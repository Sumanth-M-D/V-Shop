import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, PRODUCTS_PER_PAGE } from "../config/config.js";
import apiRequest from "../utils/apiRequest.js";

const initialState = {
  products: [],
  status: "idle",
  error: "",
  currentPage: 1,
  totalPages: 0,
  total: 0,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { categories, activeCategoryIndex, searchText } =
        getState().categories;
      const { currentPage } = getState().products;

      let URL;
      let activeCategory;
      const params = new URLSearchParams();

      params.append("page", currentPage);
      params.append("limit", PRODUCTS_PER_PAGE);

      if (searchText.length > 0) {
        params.append("search", searchText);
      } else {
        activeCategory = categories[activeCategoryIndex];
        if (activeCategory !== "All products") {
          params.append("category", activeCategory);
        }
      }

      URL = `${BASE_URL}/products?${params.toString()}`;
      const data = await apiRequest(URL, "GET");

      return {
        products: data.data.products,
        pagination: data.pagination,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    resetCurrentPage(state) {
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload.products;
        state.total = action.payload.pagination.total;
        state.totalPages = Math.ceil(
          action.payload.pagination.total / PRODUCTS_PER_PAGE
        );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setCurrentPage, resetCurrentPage } = productSlice.actions;

export default productSlice.reducer;
