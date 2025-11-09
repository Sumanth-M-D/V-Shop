import { Router } from "express";
import wishlistController from "../controllers/wishlistController.js";

const router = Router();
router
  .route("/")
  .get(wishlistController.getWishlistItems)
  .post(wishlistController.addWishlistItem)
  .delete(wishlistController.deleteWishlistItem);

export default router;
