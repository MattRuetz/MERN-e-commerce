import express from 'express';
const router = express.Router();
import {
    authUser,
    getUserProfile,
    updateUserProfile,
    registerUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// server.js has app.use("/api/users", userRoutes);
// so here, '/' points to ^

router.post('/', registerUser);
router.post('/login', authUser);

router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;
