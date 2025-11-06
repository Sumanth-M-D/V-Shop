import express from "express";
import wishlistController from "../controllers/wishlistController.js";

const router = express.Router();
router
  .route("/")
  .get(wishlistController.getWishlistItems)
  .post(wishlistController.addWishlistItem)
  .delete(wishlistController.deleteWishlistItem);

export default router;
