import express from "express";
import authController from "../controllers/authController.js";
import cartController from "../controllers/cartController.js";

const router = express.Router();

router.use(authController.protect);
router
  .route("/") 
  .get(cartController.getCartItems)
  .post(cartController.addCartItem)
  .patch(cartController.updateCartItem)
  .delete(cartController.deleteCartItem);

export default router;
