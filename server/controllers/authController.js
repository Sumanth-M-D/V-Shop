import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import dotenv from "dotenv";
import cartController from "./cartController.js";
import wishlistController from "./wishlistController.js";

// Load environment variables from .env file
dotenv.config();
const { JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIRES_IN, NODE_ENV } =
  process.env;

// Function to sign a JWT token for a user
function signToken(id) {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Function to create and send a token to the client
function createSendToken(user, statusCode, res) {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000), // Set cookie expiration
    httpOnly: true, // Cookie is not accessible via JavaScript
    sameSite: "None", // Allow cross-site cookie usage
    secure: NODE_ENV === "production", // Cookie should only be sent over HTTPS
  };

  // Set the JWT as a cookie
  res.cookie("jwt", token, cookieOptions);

  // To remove the password from the user object before sending it in the response
  user.password = undefined;

  // Send success response with user data and token
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user: user },
  });
}

// Signup controller for creating a new user
async function signup(req, res, next) {
  try {
    const { email, password } = req.body; // Extract email and password from request body
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    // Create new User
    const newUser = await User.create({ email, password });

    // Create a new cart and wishlist for the new user
    const newCart = await cartController.createCart(newUser._id, next);
    const newWishlist = await wishlistController.createWishlist(
      newUser._id,
      next
    );

    // Update the user document with the new cart and wishlist IDs
    await User.findByIdAndUpdate(newUser._id, {
      cartId: newCart._id,
      wishlistId: newWishlist._id,
    });

    // Fetch the updated user data
    const updatedNewUser = await User.findById(newUser._id);

    // Send the token and user data in the response
    createSendToken(updatedNewUser, 201, res);
  } catch (err) {
    next(err); // Pass error to the error handling middleware
  }
}

// Login controller for authenticating a user
async function login(req, res, next) {
  try {
    const { email, password: inputPassword } = req.body;

    // Check for missing fields
    if (!email || !inputPassword) {
      return next(new AppError("Please provide email and password", 400));
    }

    // Find the user by email and include the password in the query
    const user = await User.findOne({ email }).select("+password");

    // Verify user existence and password match
    if (!user || !(await user.checkPassword(inputPassword, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    // Send the token and user data in the response
    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
}

// Logout controller for logging out a user
async function logout(req, res, next) {
  try {
    res.clearCookie("jwt"); // Clear the JWT cookie
    res.status(200).json({ status: "success" });
  } catch (err) {
    next(err);
  }
}

// Middleware to protect routes and verify JWT
async function protect(req, res, next) {
  try {
    let token;
    // Check for token in Authorization header / cookies
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

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Handle token expiration
    if (Date.now() >= decoded.exp * 1000) {
      return next(new AppError("Token has expired. Please log in again.", 401));
    }

    // Fetch the current user based on the decoded ID
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("The user belonging to the token does not exist.", 404)
      );
    }

    req.user = currentUser; // Attach user information to the request object
    next();
  } catch (err) {
    next(err);
  }
}

// If the user is already logged in, send the user data without needing to reauthenticate
function isLoggedin(req, res, next) {
  const token = req.cookies.jwt;
  res.status(200).json({
    status: "success",
    token,
    data: { user: req.user },
  });
}

// Export the authentication controller functions
const authController = { signup, login, logout, protect, isLoggedin };
export default authController;
