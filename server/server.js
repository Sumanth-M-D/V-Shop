import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const db = process.env.DATABASE;
const port = process.env.PORT || 3000;

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!!! 💥💥 Shutting Down....");
  console.log(err);
  process.exit();
});

mongoose.connect(db).then(() => console.log("Database connection successful"));

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED PROMISE REJECTION!! 💥💥 Shutting down....");
  console.log(err);
  server.close(() => {
    process.exit();
  });
});
