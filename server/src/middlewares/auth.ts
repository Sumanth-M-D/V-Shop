import type { CookieOptions, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { User } from "../models/index.js";
import AppError from "../utils/appError.js";
import JwtUtil from "../utils/jwtUtil.js";

dotenv.config();

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

type AccessTokenPayload = {
  userId: string;
  iat?: number;
  exp?: number;
};

async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { accessToken, refreshToken } = req.cookies as {
      accessToken?: string;
      refreshToken?: string;
    };

    if (accessToken) {
      try {
        const decoded = JwtUtil.verifyAccessToken(accessToken) as AccessTokenPayload;
        await attachUserToRequest(decoded.userId, req);
        next();
        return;
      } catch (err) {
        if ((err as Error).name !== "TokenExpiredError") {
          next(new AppError("Invalid or expired access token. Please log in again.", 401));
          return;
        }
      }
    }

    if (refreshToken) {
      await handleRefreshToken(refreshToken, req, res);
      next();
      return;
    }

    next(new AppError("You are not logged in. Please log in to get access", 401));
  } catch (err) {
    next(err);
  }
}

async function handleRefreshToken(
  refreshToken: string,
  req: Request,
  res: Response
): Promise<void> {
  try {
    const decodedRefresh = JwtUtil.verifyRefreshToken(refreshToken) as AccessTokenPayload;
    await attachUserToRequest(decodedRefresh.userId, req);

    const newAccessToken = JwtUtil.signAccessToken({ userId: decodedRefresh.userId });
    res.cookie("accessToken", newAccessToken, cookieOptions);
  } catch {
    throw new AppError("Invalid or expired refresh token. Please log in again.", 401);
  }
}

async function attachUserToRequest(userId: string, req: Request): Promise<void> {
  const currentUser = await User.findOne({ userId }).lean();

  if (!currentUser) {
    throw new AppError("Invalid token: user not found", 404);
  }

  req.user = currentUser;
}

export default authenticate;
