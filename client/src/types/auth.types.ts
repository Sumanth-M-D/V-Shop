// Authentication types

export interface User {
  userId: string;
  email: string;
  cartId: string;
  wishlistId: string;
  name?: string;
}

export interface UserData {
  user: User;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export type AuthType = 'login' | 'signup';

