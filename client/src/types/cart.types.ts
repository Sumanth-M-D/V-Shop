// Cart and Wishlist types

import { Product } from "./product.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  cartId: string;
  userId: string;
  cartItems: CartItem[];
}

export interface CartData {
  cart: CartItem[];
  cartId?: string;
}

export interface WishlistItem {
  product: Product;
}

export interface Wishlist {
  wishlistId: string;
  userId: string;
  wishlistItems: WishlistItem[];
}

export interface WishlistData {
  wishlist: WishlistItem[];
  wishlistId?: string;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface AddToWishlistPayload {
  productId: string;
}
