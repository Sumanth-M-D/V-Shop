import express from "express";
import authController from "../controllers/authController.js";
import wishlistController from "../controllers/wishlistController.js";

const router = express.Router();

// Middleware to protect all routes in this router; only authenticated users can access these routes
router.use(authController.protect);

// Define routes for wishlist operations
router
  .route("/")
  .get(wishlistController.getWishlistItems)
  .post(wishlistController.addWishlistItem)
  .delete(wishlistController.deleteWishlistItem);

export default router;
