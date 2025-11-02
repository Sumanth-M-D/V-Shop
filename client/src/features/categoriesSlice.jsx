import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../config/config.js";
import apiRequest from "../utils/apiRequest.js";

const initialState = {
  categories: [],
  activeCategoryIndex: 0,
  status: "idle",
  error: "",
  searchText: "",
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiRequest(`${BASE_URL}/categories`, "GET");
      const categoriesFromServer = data.data.categories;
      const categories = categoriesFromServer.map(
        (category) => category.formattedName
      );
      return ["All products", ...categories];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateActiveCategory(state, action) {
      state.activeCategoryIndex = action.payload;
      if (action.payload !== "" && Number(action.payload) !== 0) {
        state.searchText = "";
      }
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
      state.activeCategoryIndex = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { updateActiveCategory, setSearchText } = categorySlice.actions;

export default categorySlice.reducer;
