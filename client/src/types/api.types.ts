// API response types

import { User } from "./auth.types";

export interface ApiResponse<T = any> {
  status: string;
  data?: T;
  message?: string;
  pagination?: PaginationResponse;
}

export interface PaginationResponse {
  total: number;
  page: number;
  limit: number;
}

export interface UserData {
  user: User;
}

export interface ProductsData {
  products: any[];
}

export type ApiStatus = "idle" | "loading" | "success" | "fail";

export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
