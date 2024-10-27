import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, ROWS_PER_PAGE } from "../config/config.js";
import apiRequest from "../utils/apiRequest.js";

// Initial state for products
const initialState = {
  products: [],
  status: "idle", // idle | loading | success | fail
  error: "",
  currentPage: 1, //For Pagination
  productsPerRow: 1, // For adjusting products per page according to screen sizes
  totalPages: 0,
  currentPageProducts: [],
  searchText: "",
};

// Async action to fetch products based on the active category from the API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState, rejectWithValue }) => {
    try {
      // Get categories and active category index from state
      const { categories, activeCategoryIndex } = getState().categories;

      const { searchText } = getState().products;

      let activeCategory = categories[activeCategoryIndex];
      let URL = `${BASE_URL}/products/category/${activeCategory}`;

      // If the active category is "All products", fetch all products
      if (activeCategory === "All products") {
        URL = `${BASE_URL}/products`;
      }

      if (searchText.length > 0) {
        URL = `${BASE_URL}/products/search/${searchText}`;
      }

      const data = await apiRequest(URL, "GET", null, false);

      return data.data.products;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Helper function to calculate and update products displayed on the current page
const calculateCurrentPageProducts = (state) => {
  const productsPerPage = state.productsPerRow * ROWS_PER_PAGE;
  const startIdx = (state.currentPage - 1) * productsPerPage;
  state.currentPageProducts = state.products.slice(
    startIdx,
    startIdx + productsPerPage
  );
};

// Helper function to calculate the total number of pages based on products and layout
const calculateTotalPages = (state) => {
  const productsPerPage = state.productsPerRow * ROWS_PER_PAGE;
  state.totalPages = Math.ceil(state.products.length / productsPerPage);
};

// Slice to handle product state, including reducers for pagination and layout updates
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Updates the number of products per row(per page) based on screen size
    updateProductsPerRow(state, action) {
      state.productsPerRow = action.payload;
      calculateTotalPages(state);
      calculateCurrentPageProducts(state);
    },

    // Increment the current page for pagination
    incrementCurrentPage(state) {
      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
        calculateCurrentPageProducts(state);
      }
    },

    // Decrement the current page for pagination
    decrementCurrentPage(state) {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
        calculateCurrentPageProducts(state);
      }
    },

    // Update the current page based on user input (direct page navigation)
    updateCurrentPage(state, action) {
      state.currentPage = Number(action.payload);
      calculateCurrentPageProducts(state);
    },

    // Reset the current page to the first page (useful on category change or screen resize)
    resetCurrentPage(state) {
      state.currentPage = 1;
      calculateCurrentPageProducts(state);
    },

    // Setting the search text
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
  },

  // Handle async actions related to product fetching => handling Pending, fullFilled and rejected states
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;

        // Calculate total pages and update the products displayed on the current page
        calculateTotalPages(state);

        calculateCurrentPageProducts(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload || action.error.message;
      });
  },
});

// Export the actions to be used in the UI components
export const {
  updateProductsPerRow,
  incrementCurrentPage,
  decrementCurrentPage,
  updateCurrentPage,
  resetCurrentPage,
  setSearchText,
} = productSlice.actions;

// Export the reducer to be included in the Redux store
export default productSlice.reducer;
