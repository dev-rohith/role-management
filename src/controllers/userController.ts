import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { AuthenticatedUser, UpdateRoleRequest, UpdateStatusRequest } from '../types';
import { AppError } from '../utils/errors';
import { validateUpdateRole, validateUpdateStatus } from '../utils/validation';

export class UserController {
  // PUT /api/users/:id/role
  static async updateUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id as string
      const currentUser = (req as any).user as AuthenticatedUser;
      const { role }: UpdateRoleRequest = req.body;

      // Validate request
      const validation = validateUpdateRole({ role });
      if (!validation.success) {
        throw new AppError('Invalid role', 400);
      }

      // Check authorization
      if (!UserService.canChangeRole(currentUser, role)) {
        throw new AppError('Insufficient permissions', 403);
      }

      // Get target user
      const targetUser = await UserService.getUserById(userId);
      if (!targetUser) {
        throw new AppError('User not found', 404);
      }

      // Check if can modify this user
      if (!UserService.canModifyUser(currentUser, targetUser)) {
        throw new AppError('Cannot modify this user', 403);
      }

      // Update role
      const updatedUser = await UserService.updateUserRole(userId, role);

      res.json({
        success: true,
        data: { ...updatedUser, password: undefined }
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/users/:id/status
  static async updateUserStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id as string
      const currentUser = (req as any).user as AuthenticatedUser;
      const { status }: UpdateStatusRequest = req.body;

      // Validate request
      const validation = validateUpdateStatus({ status });
      if (!validation.success) {
        throw new AppError('Invalid status', 400);
      }

      // Get target user
      const targetUser = await UserService.getUserById(userId);
      if (!targetUser) {
        throw new AppError('User not found', 404);
      }

      // Check authorization
      if (!UserService.canChangeStatus(currentUser, targetUser)) {
        throw new AppError('Insufficient permissions', 403);
      }

      // Update status
      const updatedUser = await UserService.updateUserStatus(userId, status);

      res.json({
        success: true,
        data: { ...updatedUser, password: undefined }
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/users/:id
  static async getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id as string
      const currentUser = (req as any).user as AuthenticatedUser;

      // Check authorization - can view own profile or admin/super_admin can view any
      const canView = currentUser.id === userId || 
                     currentUser.role === 'admin' || 
                     currentUser.role === 'super_admin';
         console.log(userId)
      if (!canView) {
        throw new AppError('Insufficient permissions', 403);
      }

      const user = await UserService.getUserById(userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      res.json({
        success: true,
        data: { ...user, password: undefined }
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/users
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const currentUser = (req as any).user as AuthenticatedUser;

      // Check authorization - only admin/super_admin can list users
      if (currentUser.role !== 'admin' && currentUser.role !== 'super_admin') {
        throw new AppError('Insufficient permissions', 403);
      }

      const users = await UserService.getAllUsers();

      res.json({
        success: true,
        data: users.map(user => ({ ...user, password: undefined }))
      });
    } catch (error) {
      next(error);
    }
  }
}