import express from "express";
const router = express.Router();
import { authUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

// server.js has app.use("/api/users", userRoutes);
// so here, '/' points to ^

// router.route("/").get(getProducts);
router.post("/login", authUser);

router.get("/profile", protect, getUserProfile);

export default router;
