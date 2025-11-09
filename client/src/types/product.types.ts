// Product related types

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  productId: string;
  title: string;
  price: number;
  description?: string;
  category: string;
  image: string[];
  rating: Rating;
  stock?: number;
  brand?: string;
  specifications?: Record<string, any>;
}

export interface ProductsData {
  products: Product[];
}

export interface ProductData {
  product: Product;
}
