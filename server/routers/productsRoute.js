import express from "express";
import productsController from "../controllers/productsController.js";

const router = express.Router();

// Define routes for product-related operations
router.get("/", productsController.getAllProducts);
router.get("/categories", productsController.getAllCategories);
router.get("/:id", productsController.getProduct); // Route to get a specific product by its ID
router.get("/category/:category", productsController.getProductsOfCategory);
router.get("/search/:searchTitle", productsController.getProductsMatching); // Route to search for products matching a specific title

export default router;
