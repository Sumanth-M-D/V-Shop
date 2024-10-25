import express from "express";
import authController from "../controllers/authController.js";
import wishlistController from "../controllers/wishlistController.js";

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(wishlistController.getWishlistItems)
  .post(wishlistController.addWishlistItem)
  .delete(wishlistController.deleteWishlistItem);

export default router;
