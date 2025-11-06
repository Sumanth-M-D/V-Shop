import express from "express";
import categoriesController from "../controllers/categoriesController.js";

const router = express.Router();

router.get("/", categoriesController.getCategories);
router.get(
  "/formatted/:formattedName",
  categoriesController.getCategoryByFormattedName
);
router.get("/:id", categoriesController.getCategory);

export default router;
