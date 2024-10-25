import { createSlice } from "@reduxjs/toolkit";

// Helper function to save the cart to localStorage
function updateCartInLocalStorage(userId, cartProducts) {
  localStorage.setItem(`${userId}/cart`, JSON.stringify(cartProducts));
}

// Helper function to load the cart from localStorage
function loadCartFromLocalStorageHelper(userId) {
  if (userId) {
    const cart = localStorage.getItem(`${userId}/cart`);
    return cart ? JSON.parse(cart) : [];
  }
  // If no userId, return an empty cart
  return [];
}

// Initial state of the shopping cart
const initialState = {
  cartProducts: [],
  shipping: 0,
  userId: "",
  cartId: "",
};

// Action to load cart products from localStorage based on user ID
export async function loadCartFromLocalStorage(state, action) {
  const userId = action.payload; // Pass userId as an argument
  state.userId = userId;
  state.cartProducts = loadCartFromLocalStorageHelper(userId);
}

// Action to add a product to the cart
export async function addProductToCart(state, action) {
  // Check if product already exists in the cart
  const index = state.cartProducts.findIndex(
    (product) => product.id === action.payload.id
  );

  // If product is not found, push it to the cart
  if (index === -1) {
    state.cartProducts.push(action.payload);
  } else {
    // If product is found, increase its quantity
    state.cartProducts[index].quantity += action.payload.quantity;
  }

  updateCartInLocalStorage(state.userId, state.cartProducts);
}

// Action to remove a product from the cart
export async function removeProduct(state, action) {
  state.cartProducts = state.cartProducts.filter(
    (product) => product.id !== action.payload
  );
  updateCartInLocalStorage(state.userId, state.cartProducts);
}

// Action to update the quantity of a specific product in the cart
export async function updateProductQuantity(state, action) {
  const { id, quantity } = action.payload;
  if (quantity < 1) return;
  state.cartProducts = state.cartProducts.map((ele) =>
    ele.id === id ? { ...ele, quantity } : ele
  );
  updateCartInLocalStorage(state.userId, state.cartProducts);
}

// Create a slice for the shopping cart
const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    // Action to update the shipping cost
    updateShipping(state, action) {
      state.shipping = action.payload;
    },
  },
});

export const {
  addProductToCart,
  removeProduct,
  updateShipping,
  updateProductQuantity,
  loadCartFromLocalStorage,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
