// Authentication types

export interface User {
  _id: string;
  email: string;
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

