// Cart and Wishlist types

import { Product } from './product.types';

export interface CartItem {
  product: Product;
  quantity: number;
  _id?: string;
}

export interface Cart {
  _id: string;
  userId: string;
  cartItems: CartItem[];
}

export interface CartData {
  cart: Cart;
}

export interface WishlistItem {
  product: Product;
  _id?: string;
}

export interface Wishlist {
  _id: string;
  userId: string;
  wishlistItems: WishlistItem[];
}

export interface WishlistData {
  wishlist: Wishlist;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface AddToWishlistPayload {
  productId: string;
}

