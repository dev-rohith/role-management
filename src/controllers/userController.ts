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
       1. Extract userId from req.params.id
      
       2. Get current user - cast (req as any).user to AuthenticatedUser type
      
       3. Extract role from req.body using UpdateRoleRequest type
      
       4. Use validateUpdateRole function - check if validation fails, throw AppError with appropriate status
      
       5. Use UserService.canChangeRole method - if false, throw AppError with appropriate status
      
       6. Use UserService.getUserById - if null, throw AppError with appropriate status
      
       7. Use UserService.canModifyUser - if false, throw AppError with appropriate status
      
       8. Use UserService.updateUserRole method
      
       9. Send response with success: true format, exclude password field
      */
    } catch (error) {
      next(error);
    }
  }

  static async updateUserStatus(req: Request, res: Response, next: NextFunction) {
    try {
      /*
       1. Extract userId from params
      
       2. Get authenticated user from request
      
       3. Extract status using UpdateStatusRequest type
      
       4. Use validateUpdateStatus - handle validation failure with AppError
      
       5. Use UserService.getUserById - handle user not found with AppError and appropriate status
      
       6. Use UserService.canChangeStatus - handle permission failure with AppError and appropriate status
      
       7. Use UserService.updateUserStatus method
      
       8. Return success response, remove password field
      */
    } catch (error) {
      next(error);
    }
  }

  static async getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      /*
       1. Extract userId from params
      
       2. Get current user using AuthenticatedUser type
      
       3. Check permissions: own profile OR admin/super_admin role - use AppError with appropriate status if denied
      
       4. Use UserService.getUserById - handle not found with AppError and appropriate status
      
       5. Return success response without password
      */
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      /*
       1. Get current user using AuthenticatedUser type
      
       2. Check if role is admin or super_admin - use AppError with appropriate status if not
      
       3. Use UserService.getAllUsers method
      
       4. Return success response, remove password from each user in array
      */
    } catch (error) {
      next(error);
    }
  }
  
}