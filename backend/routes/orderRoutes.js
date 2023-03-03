import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// server.js has app.use("/api/order", userRoutes);
// so here, '/' points to ^

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
