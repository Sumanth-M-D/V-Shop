import dotenv from "dotenv";
import type { Server } from "node:http";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const { DATABASE, PORT } = process.env;

if (!DATABASE) {
  throw new Error("DATABASE connection string is not defined");
}

const port = Number(PORT) || 3000;

process.on("uncaughtException", (err: Error) => {
  console.error("UNCAUGHT EXCEPTION!!! 💥💥 Shutting Down....");
  console.error(err);
  process.exit(1);
});

mongoose
  .connect(DATABASE)
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

let server: Server;

mongoose.connection.once("open", () => {
  server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});

process.on("unhandledRejection", (err: unknown) => {
  console.error("UNHANDLED PROMISE REJECTION!! 💥💥 Shutting down....");
  console.error(err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
