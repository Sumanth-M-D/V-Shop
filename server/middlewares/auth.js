import JwtUtil from "../utils/jwtUtil.js";
import AppError from "../utils/appError.js";
import { Product, User } from "../models/index.js";
import dotenv from "dotenv";
dotenv.config();

async function authenticate(req, res, next) {
  try {
    let { accessToken, refreshToken } = req.cookies;
    if (!accessToken && !refreshToken) {
      return next(new AppError("You are not logged in. Please log in to get access", 401));
    }

    let decoded;
    try {
      decoded = JwtUtil.verifyAccessToken(accessToken);
    } catch (err) {
      // If accessToken expired, try refreshToken
      if (err.name === "TokenExpiredError" && refreshToken) {
        try {
          const decodedRefresh = JwtUtil.verifyRefreshToken(req.cookies.refreshToken);
          const currentUser = await User.findOne({ userId: decodedRefresh.userId });
          if (!currentUser) {
            return next(new AppError("Invalid refresh token: user not found", 404));
          }
          // Issue new accessToken
          const newAccessToken = JwtUtil.signAccessToken({ userId: currentUser.userId });
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
          req.user = currentUser;
          return next();
        } catch (refreshErr) {
          return next(new AppError("Invalid or expired refresh token. Please log in again.", 401));
        }
      }
      return next(new AppError("Invalid or expired access token. Please log in again.", 401));
    }

    const currentUser = await User.findOne({ userId: decoded.userId }).lean();

    if (!currentUser) {
      return next(new AppError("Invalid access token: user not found", 404));
    }
    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
}

export default authenticate;