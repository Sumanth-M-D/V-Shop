// Redux state types

import { ApiStatus } from "./api.types";
import { Product } from "./product.types";
import { CartItem, WishlistItem } from "./cart.types";
import { AuthType } from "./auth.types";

export interface ProductsState {
  products: Product[];
  status: ApiStatus;
  error: string;
  currentPage: number;
  totalPages: number;
  total: number;
}

export interface CategoriesState {
  categories: string[];
  activeCategoryIndex: number | string;
  status: ApiStatus;
  error: string;
  searchText: string;
}

export interface ProductDetailsState {
  productId: string | null;
  productData: Partial<Product>;
  status: ApiStatus;
  error: string;
  quantity: number;
}

export interface AuthenticationState {
  authType: AuthType;
  isAuthenticated: boolean;
  userId: string;
  error: string;
  status: string;
}

export interface ShoppingCartState {
  cartProducts: CartItem[];
  shipping: number;
  cartId: string;
  error: string;
  status: string;
}

export interface WishlistState {
  wishlistProducts: WishlistItem[];
  wishlistId: string;
  error: string;
  status: string;
}
