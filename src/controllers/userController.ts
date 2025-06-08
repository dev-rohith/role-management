import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { AuthenticatedUser, UpdateRoleRequest, UpdateStatusRequest } from '../types';
import { AppError } from '../utils/errors';
import { validateUpdateRole, validateUpdateStatus } from '../utils/validation';

export class UserController {
  static async updateUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id as string;
      const currentUser = (req as any).user as AuthenticatedUser;
      const { role }: UpdateRoleRequest = req.body;

      // Validate role (TODO: complete validation logic in utils/validation)

      const validation = validateUpdateRole({ role });
      if (!validation.success) {
        throw new AppError('Invalid role', 400);
      }

      // TODO: Implement authorization check for changing roles

      if (!UserService.canChangeRole(currentUser, role)) {
        throw new AppError('Insufficient permissions', 403);
      }

      // TODO: Fetch user and validate if modifiable

      const targetUser = await UserService.getUserById(userId);
      if (!targetUser) {
        throw new AppError('User not found', 404);
      }
      if (!UserService.canModifyUser(currentUser, targetUser)) {
        throw new AppError('Cannot modify this user', 403);
      }

      // TODO: Implement update role in UserService and return updated user

      const updatedUser = await UserService.updateUserRole(userId, role);

      //TODO: Hide password before sending response

      res.json({
        success: true,
        data: { ...updatedUser, password: undefined }
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUserStatus(req: Request, res: Response, next: NextFunction) {
    //TODO:
    // NOTE: Method implementation is incomplete, you should:
    // 1. Validate status from req.body
    // 2. Check permissions with UserService.canChangeStatus
    // 3. Get target user and verify existence
    // 4. Update status and respond without password
    
    next(new AppError('updateUserStatus not implemented yet', 501));
  }

  static async getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id as string;
      const currentUser = (req as any).user as AuthenticatedUser;

      // Authorization: can view own profile or admin/super_admin can view any
      const canView = currentUser.id === userId || currentUser.role === 'admin' || currentUser.role === 'super_admin';
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

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const currentUser = (req as any).user as AuthenticatedUser;

      // Only admin or super_admin can get the list
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
