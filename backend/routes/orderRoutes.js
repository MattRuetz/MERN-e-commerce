import express from 'express';
const router = express.Router();
import { addOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// server.js has app.use("/api/order", userRoutes);
// so here, '/' points to ^

router.route('/').post(protect, addOrderItems);

export default router;
