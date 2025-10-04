import express from "express";
import cartController from "../controllers/cartController.js";

const router = express.Router();

router
  .route("/") 
  .get(cartController.getCartItems)
  .post(cartController.addCartItem)
  .patch(cartController.updateCartItem)
  .delete(cartController.deleteCartItem);

export default router;
