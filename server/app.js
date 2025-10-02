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
import morgan from "morgan";

dotenv.config();
const { CLIENT_URL } = process.env;

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(compression());
app.use(ExpressMongoSanitize());

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);

app.use("*", (req, res, next) => {
  next(new AppError("Cannot find this route on this server", 404));
});

app.use(globalErrorHandler);

export default app;
