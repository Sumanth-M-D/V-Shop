import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import type { CookieOptions } from "express";
import { Cart, User, Wishlist } from "../models/index.js";
import type { AuthenticatedUser, UserDocument, UserSafe } from "../models/index.js";
import IdGenerator from "../utils/idGenerator.js";
import AppError from "../utils/appError.js";
import JwtUtil from "../utils/jwtUtil.js";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

type AuthCookies = {
  accessToken: string;
  refreshToken: string;
};

const cookieOptions: Pick<CookieOptions, "httpOnly" | "secure" | "sameSite"> = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "strict",
};

function sanitizeUser(user: UserDocument | UserSafe): UserSafe {
  const userObject = "toObject" in user ? user.toObject() : user;
  const { password: _password, ...safeUser } = userObject as UserSafe & { password?: string };
  return safeUser;
}

function sendAuthCookies(user: Pick<AuthenticatedUser, "userId">, res: Response): AuthCookies {
  const accessToken = JwtUtil.signAccessToken({ userId: user.userId });
  const refreshToken = JwtUtil.signRefreshToken({ userId: user.userId });

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  return { accessToken, refreshToken };
}

async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return next(new AppError("Email already in use. Please login.", 400));
    }

    const userId = IdGenerator.getUserId();
    const cartId = IdGenerator.getCartId();
    const wishlistId = IdGenerator.getWishlistId();

    const newUserDoc: UserDocument = await User.create({
      userId,
      email,
      password,
      cartId,
      wishlistId,
    });
    await Cart.create({ userId, cartId, cartItems: [] });
    await Wishlist.create({ userId, wishlistId, wishlistItems: [] });

    const { accessToken, refreshToken } = sendAuthCookies({ userId }, res);
    const newUser = sanitizeUser(newUserDoc);

    res.status(201).json({
      status: "success",
      accessToken,
      refreshToken,
      data: { user: newUser },
    });
  } catch (err) {
    next(err);
  }
}

async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password: inputPassword } = req.body as { email?: string; password?: string };
    if (!email || !inputPassword) {
      return next(new AppError("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.password || !(await user.checkPassword(inputPassword))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    const { accessToken, refreshToken } = sendAuthCookies({ userId: user.userId }, res);
    const sanitizedUser = sanitizeUser(user);

    res.status(200).json({
      status: "success",
      accessToken,
      refreshToken,
      data: { user: sanitizedUser },
    });
  } catch (err) {
    next(err);
  }
}

async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ status: "success" });
  } catch (err) {
    next(err);
  }
}

async function isLoggedin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      return next(new AppError("You are not logged in. Please log in to get access", 401));
    }
    const sanitizedUser = sanitizeUser(req.user as UserDocument | UserSafe);

    res.status(200).json({
      status: "success",
      data: { user: sanitizedUser },
    });
  } catch (err) {
    next(err);
  }
}

const authController = { signup, login, logout, isLoggedin };
export default authController;
