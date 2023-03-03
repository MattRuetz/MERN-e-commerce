import express from 'express';
const router = express.Router();
import {
    authUser,
    getUserProfile,
    updateUserProfile,
    registerUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

// server.js has app.use("/api/users", userRoutes);
// so here, '/' points to ^

router.post('/', registerUser);
router.get('/', protect, admin, getUsers);
router.post('/login', authUser);

router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;
