import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

// router.use(); // authController.protect
// router.route("/cart").get().post();

// router.route("/wishlist").get().post();

export default router;
