import express from "express";
import productsController from "../controllers/productsController.js";

const router = express.Router();

router.get("/", productsController.getProducts);
router.get("/categories", productsController.getAllCategories);
router.get("/:id", productsController.getProduct);

export default router;
