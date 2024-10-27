import express from "express";
import authController from "../controllers/authController.js";
import cartController from "../controllers/cartController.js";

const router = express.Router(); // Creating a new router instance

// Protect all routes that follow this middleware using the protect function
router.use(authController.protect);

// Define routes for cart-related operations
router
  .route("/") 
  .get(cartController.getCartItems)
  .post(cartController.addCartItem)
  .patch(cartController.updateCartItem)
  .delete(cartController.deleteCartItem);

export default router;
