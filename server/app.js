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

dotenv.config();
const { CLIENT_URL } = process.env;

// Creating an app
const app = express();

// Global Middlewares
app.use(express.json());
app.use(cookieParser()); // for parsing cookies from client
app.use(
  cors({
    origin: CLIENT_URL, // Allow only the specific origin
    credentials: true, // Allow credentials (cookies, headers)
  })
); // For enabling CORS

app.use(compression()); // for compressing the API responses
app.use(ExpressMongoSanitize()); // for prevention of noSql query injection

// Mounting routeres
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);

app.use("*", (req, res, next) => {
  next(new AppError("Cannot find this route on this server", 404));
});

app.use(globalErrorHandler);

export default app;
