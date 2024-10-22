import express from "express";
import cookieParser from "cookie-parser";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import compression from "compression";
import userRouter from "./routers/userRoute.js";
import productRouter from "./routers/productsRoute.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

// Creating an app
const app = express();

// Global Middlewares
app.use(express.json());
app.use(cookieParser()); // for parsing cookies from client
app.use(cors()); // For enabling CORS
app.use("*", cors());
app.use(compression()); // for compressing the API responses
app.use(ExpressMongoSanitize()); // for prevention of noSql query injection

// Mounting routeres
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

app.use("*", (req, res, next) => {
  next(new AppError("Cannot find this route on this server", 404));
});

app.use(globalErrorHandler);

export default app;
