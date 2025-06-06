// src/routes/users.ts
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/authorize.js';
import {
  updateUserRole,
  updateUserStatus,
  getUserProfile,
  getAllUsers
} from '../controllers/userController.js';

const router = express.Router();

// TODO: Implement these routes with proper authorization
// Consider which routes need specific role authorization
router.put('/:id/role', authenticateToken, updateUserRole);
router.put('/:id/status', authenticateToken, updateUserStatus); 
router.get('/:id', authenticateToken, getUserProfile);
router.get('/', authenticateToken, getAllUsers);

export default router;