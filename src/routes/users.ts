import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Update user role (super admin only)
router.put('/:id/role', UserController.updateUserRole);

// Update user status (admin/super admin with restrictions)
router.put('/:id/status', UserController.updateUserStatus);

// Get user profile (own profile or admin/super admin)
router.get('/:id', UserController.getUserProfile);

// List all users (admin/super admin only)
router.get('/', UserController.getAllUsers);

export default router;