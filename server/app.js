import express from "express";
import cookieParser from "cookie-parser";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import compression from "compression";
import userRouter from "./routers/userRoute.js";
import productRouter from "./routers/productsRoute.js";
import cartRouter from "./routers/cartRoutes.js";
import wishlistRouter from "./routers/wishlistRoutes.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
const { CLIENT_URL } = process.env;

// Creating an Express application instance
const app = express();

// Global Middlewares
app.use(express.json()); // for parsing JSON payloads
app.use(cookieParser()); // for parsing cookies from client

// CORS configuration to allow requests only from specified origin
app.use(
  cors({
    origin: CLIENT_URL, // Allow only the specific origin
    credentials: true, // Allow credentials (cookies, headers)
  })
);
app.use(compression()); // for compressing the API responses
app.use(ExpressMongoSanitize()); // for prevention of noSql query injection

// Mounting Routers for handling API routes
app.use("/api/user", userRouter); // Routes for user-related actions
app.use("/api/products", productRouter); // Routes for product-related actions
app.use("/api/cart", cartRouter); // Routes for cart-related actions
app.use("/api/wishlist", wishlistRouter); // Routes for wishlist-related actions

// Route handler for undefined routes (404 Not Found)
app.use("*", (req, res, next) => {
  next(new AppError("Cannot find this route on this server", 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

export default app;
