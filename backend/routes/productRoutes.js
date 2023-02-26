import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

// server.js has app.use("/api/products", productRoutes);
// so here, '/' points to ^

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
