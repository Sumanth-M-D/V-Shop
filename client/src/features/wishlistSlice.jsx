import { createSlice } from "@reduxjs/toolkit";

// Helper function to save the wishlist to localStorage
function updateWishlistInLocalStorage(userId, wishlistProducts) {
  localStorage.setItem(`${userId}/wishlist`, JSON.stringify(wishlistProducts));
}

// Helper function to load the wishlist from localStorage
function loadWishlistFromLocalStorageHelper(userId) {
  if (userId) {
    const wishlist = localStorage.getItem(`${userId}/wishlist`);
    return wishlist ? JSON.parse(wishlist) : [];
  }
  return [];
}

const initialState = {
  wishlistProducts: [],
  userId: "",
};

// Create a slice for the wishlist
const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState,
  reducers: {
    // Action to load wishlist products from localStorage based on user ID
    loadWishlistFromLocalStorage(state, action) {
      const userId = action.payload; // Pass userId as an argument
      state.userId = userId;
      state.wishlistProducts = loadWishlistFromLocalStorageHelper(userId);
    },

    // Action to add a product to the wishlist
    addProductToWishlist(state, action) {
      // Check if the product already exists in the wishlist
      const index = state.wishlistProducts.findIndex(
        (product) => product.id === action.payload.id
      );

      // If the product is not found, add it to the wishlist
      if (index === -1) {
        state.wishlistProducts.push(action.payload);
      } else {
        // If the product is found, increment its quantity
        state.wishlistProducts[index].quantity += action.payload.quantity;
      }

      updateWishlistInLocalStorage(state.userId, state.wishlistProducts);
    },

    // Action to remove a product from the wishlist
    removeProduct(state, action) {
      state.wishlistProducts = state.wishlistProducts.filter(
        (product) => product.id !== action.payload
      );
      updateWishlistInLocalStorage(state.userId, state.wishlistProducts);
    },
  },
});

export const {
  loadWishlistFromLocalStorage,
  addProductToWishlist,
  removeProduct,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
