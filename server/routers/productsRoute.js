import express from "express";
import productsController from "../controllers/productsController.js";

const router = express.Router();

router.get("/", productsController.getAllProducts);
router.get("/categories", productsController.getAllCategories);
router.get("/:id", productsController.getProduct);
router.get("/category/:category", productsController.getProductsOfCategory);
router.get("/search/:searchTitle", productsController.getProductsMatching);

export default router;
