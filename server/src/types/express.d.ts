import type { AuthenticatedUser } from "../models/userModel.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};
