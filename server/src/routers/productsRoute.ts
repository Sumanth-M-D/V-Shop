import { Router } from "express";
import productsController from "../controllers/productsController.js";

const router = Router();

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProduct);

export default router;
