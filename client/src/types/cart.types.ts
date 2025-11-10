// Cart and Wishlist types
export interface CartItem {
  productId: string;
  image?: string;
  price?: number;
  title?: string;
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
  productId: string;
  image?: string;
  price?: number;
  title?: string;
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
