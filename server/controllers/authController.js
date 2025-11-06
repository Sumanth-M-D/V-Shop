import JwtUtil from "../utils/jwtUtil.js";
import { User, Cart, Wishlist } from "../models/index.js";
import AppError from "../utils/appError.js";
import dotenv from "dotenv";
import cartController from "./cartController.js";
import wishlistController from "./wishlistController.js";
import IdGenerator from "../utils/idGenerator.js";

dotenv.config();
const { NODE_ENV } = process.env;

function sendAuthCookies(user, res) {
  const accessToken = JwtUtil.signAccessToken({ userId: user.userId });
  const refreshToken = JwtUtil.signRefreshToken({ userId: user.userId });

  const accessCookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict"
  };
  const refreshCookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict"
  };

  res.cookie("accessToken", accessToken, accessCookieOptions);
  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  return { accessToken, refreshToken };
}

async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return next(new AppError("Email already in use. Please login.", 400));
    }

    // Generate new user, cart, and wishlist IDs
    const userId = IdGenerator.getUserId();
    const cartId = IdGenerator.getCartId();
    const wishlistId = IdGenerator.getWishlistId();

    const newUser = await User.create({
      userId, // use userId field
      email,
      password,
      cartId,
      wishlistId,
    });
    await Cart.create({ userId, cartId, cartItems: [] });
    await Wishlist.create({ userId, wishlistId, wishlistItems: [] });
    const { accessToken, refreshToken } = sendAuthCookies(newUser, res);
    newUser.password = undefined;
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

async function login(req, res, next) {
  try {
    const { email, password: inputPassword } = req.body;
    if (!email || !inputPassword) {
      return next(new AppError("Please provide email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.checkPassword(inputPassword, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }
    const { accessToken, refreshToken } = sendAuthCookies(user, res);
    user.password = undefined;
    res.status(200).json({
      status: "success",
      accessToken,
      refreshToken,
      data: { user: user },
    });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ status: "success" });
  } catch (err) {
    next(err);
  }
}

const authController = { signup, login, logout };
export default authController;
