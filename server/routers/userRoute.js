import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

// Define routes for user authentication operations
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Middleware to protect routes below it; only authenticated users can access these routes
router.use(authController.protect);
router.get("/isLoggedIn", authController.isLoggedin); // Route to check if the user is logged in and return user data
router.post("/logout", authController.logout);

export default router;
