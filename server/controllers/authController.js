import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import dotenv from "dotenv";
import cartController from "./cartController.js";
import wishlistController from "./wishlistController.js";

dotenv.config();
const { JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIRES_IN, NODE_ENV } =
  process.env;

function signToken(id) {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function createSendToken(user, statusCode, res) {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "None",
    secure: NODE_ENV === "production",
  };

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user: user },
  });
}

async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    const newUser = await User.create({ email, password });

    const newCart = await cartController.createCart(newUser._id, next);
    const newWishlist = await wishlistController.createWishlist(
      newUser._id,
      next
    );

    await User.findByIdAndUpdate(newUser._id, {
      cartId: newCart._id,
      wishlistId: newWishlist._id,
    });

    const updatedNewUser = await User.findById(newUser._id);
    createSendToken(updatedNewUser, 201, res);
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

    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ status: "success" });
  } catch (err) {
    next(err);
  }
}

async function protect(req, res, next) {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in. Please log in to get access", 401)
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (Date.now() >= decoded.exp * 1000) {
      return next(new AppError("Token has expired. Please log in again.", 401));
    }

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("The user belonging to the token does not exist.", 404)
      );
    }

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
}

function isLoggedin(req, res, next) {
  const token = req.cookies.jwt;
  res.status(200).json({
    status: "success",
    token,
    data: { user: req.user },
  });
}

const authController = { signup, login, logout, protect, isLoggedin };
export default authController;
