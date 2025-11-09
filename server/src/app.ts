import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";
import morgan from "morgan";
import userRouter from "./routers/userRoute.js";
import productRouter from "./routers/productsRoute.js";
import categoryRouter from "./routers/categoriesRoute.js";
import cartRouter from "./routers/cartRoutes.js";
import wishlistRouter from "./routers/wishlistRoutes.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import authenticate from "./middlewares/auth.js";

dotenv.config();
const protectedRoutes: readonly string[] = [
  "/api/user/isLoggedin",
  "/api/user/logout",
  "/api/cart",
  "/api/wishlist",
] as const;

const app = express();

app.use(morgan("dev"));

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(compression());
app.use(ExpressMongoSanitize());

app.use((req: Request, res: Response, next: NextFunction) => {
  if (protectedRoutes.some((route) => req.path.startsWith(route))) {
    void authenticate(req, res, next);
  } else {
    next();
  }
});

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError("Cannot find this route on this server", 404));
});

app.use(globalErrorHandler);

export default app;
