import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIRES_IN, NODE_ENV } =
  process.env;

function signToken(id) {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function createSendToken(user, statusCode, res) {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(JWT_COOKIE_EXPIRES_IN * 60 * 60 * 24 * 1000),
    httpOnly: true,
  };

  if (NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  res.cookie("jwt", token, cookieOptions);

  /// To remove the passwords from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
}

function verifyToken(token, next) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(err);
  }
}

async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    const newUser = await User.create({ email, password });

    createSendToken(newUser, 201, res);
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

const authController = { signup, login };
export default authController;
