import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { AuthenticatedUser, UpdateRoleRequest, UpdateStatusRequest } from '../types';
import { AppError } from '../utils/errors';
import { validateUpdateRole, validateUpdateStatus } from '../utils/validation';

/*
 NOTE:  Please check the types defined in `types/index.ts` before adding new ones.
        Use the existing types where appropriate.
        If needed, update or extend them to fit the current requirements.
        This helps us assess your understanding of TypeScript types.

 NOTE: Carefully review all imported modules and how they are used in the code.
        Understand the logic and context before making any changes.
        This ensures that any modifications you make are accurate and consistent.
*/

export class UserController {

  static async updateUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      /*
       TODO: Extract userId from request parameters
       Get userId from req.params.id and cast to string
      

       TODO: Get current authenticated user from request
       Cast (req as any).user as AuthenticatedUser type
  

       TODO: Extract role from request body
       Expected req.body format: { role: string }
       Get role from req.body with UpdateRoleRequest type
      

       TODO: Validate the role using validation function
       Use validateUpdateRole({ role }) function
       If validation fails, throw new AppError('Invalid role', 400)
      

       TODO: Check if current user has permission to change roles
       Use UserService.canChangeRole(currentUser, role) method
       If no permission, throw new AppError('Insufficient permissions', 403)
      

       TODO: Find the target user to be updated
       Use UserService.getUserById(userId) method
       If user not found, throw new AppError('User not found', 404)
      

       TODO: Check if current user can modify the target user
       Use UserService.canModifyUser(currentUser, targetUser) method
       If cannot modify, throw new AppError('Cannot modify this user', 403)
      

       TODO: Update the user's role
       Use UserService.updateUserRole(userId, role) method
      

       TODO: Send success response
       Send response with format: { success: true, data: user object without password }
       Remove password field using: { ...updatedUser, password: undefined }
      */

    } catch (error) {
      next(error);
    }
  }

  static async updateUserStatus(req: Request, res: Response, next: NextFunction) {
    try {
      /*
       TODO: Extract userId from request parameters
       Get userId from req.params.id and cast to string
      

       TODO: Get current authenticated user from request
       Cast (req as any).user as AuthenticatedUser type
      

       TODO: Extract status from request body
       Expected req.body format: { status: string }
       Get status from req.body with UpdateStatusRequest type
      

       TODO: Validate the status using validation function
       Use validateUpdateStatus({ status }) function
       If validation fails, throw new AppError('Invalid status', 400)
      

       TODO: Find the target user to be updated
       Use UserService.getUserById(userId) method
       If user not found, throw new AppError('User not found', 404)
      

       TODO: Check if current user has permission to change status
       Use UserService.canChangeStatus(currentUser, targetUser) method
       If no permission, throw new AppError('Insufficient permissions', 403)
      

       TODO: Update the user's status
       Use UserService.updateUserStatus(userId, status) method
  

       TODO: Send success response
       Send response with format: { success: true, data: user object without password }
       Remove password field using: { ...updatedUser, password: undefined }
      */

    } catch (error) {
      next(error);
    }
  }

  static async getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      /*
       TODO: Extract userId from request parameters
       Get userId from req.params.id and cast to string
      

       TODO: Get current authenticated user from request
       Cast (req as any).user as AuthenticatedUser type
  

       TODO: Check if current user can view this profile
       User can view if:
       - currentUser.id === userId (viewing own profile)
       - currentUser.role === 'admin' 
       - currentUser.role === 'super_admin'
       If no permission, throw new AppError('Insufficient permissions', 403)
      

       TODO: Find the user by ID
       Use UserService.getUserById(userId) method
       If user not found, throw new AppError('User not found', 404)
      

       TODO: Send success response
       Send response with format: { success: true, data: user object without password }
       Remove password field using: { ...user, password: undefined }
      */

    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      /*
       TODO: Get current authenticated user from request
       Cast (req as any).user as AuthenticatedUser type
      

       TODO: Check if current user has admin permissions
       Only 'admin' and 'super_admin' roles can view all users
       If not admin or super_admin, throw new AppError('Insufficient permissions', 403)
      

       TODO: Get all users from database
       Use UserService.getAllUsers() method
      

       TODO: Send success response with all users
       Send response with format: { success: true, data: array of user objects without passwords }
       Remove password from each user: users.map(user => ({ ...user, password: undefined }))
      */

    } catch (error) {
      next(error);
    }
  }
  
}
