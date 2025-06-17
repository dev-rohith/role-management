import jwt from 'jsonwebtoken';
import type { Response, NextFunction } from 'express';
import { UserModel } from '../models/user';
import { UnauthorizedError } from '../utils/errors';
import { AuthenticatedRequest } from '../types';

/*
 NOTE:  Please check the types defined in `types/index.ts` before adding new ones.
        Use the existing types where appropriate.
        If needed, update or extend them to fit the current requirements.
        This helps us assess your understanding of TypeScript types.

 NOTE: Carefully review all imported modules and how they are used in the code.
        Understand the logic and context before making any changes.
        This ensures that any modifications you make are accurate and consistent.
*/

export const authenticateToken = async (req: AuthenticatedRequest,res: Response,next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    // TODO: Extract token from authHeader

    if (!token) {
      throw new UnauthorizedError('Access token required');
    }

    // TODO: Verify JWT token

    // TODO: Fetch user by ID from token payload

    // TODO: Check if user exists and is active use the UserModel for db operations

    // TODO: Attach user to req.user = user

    next();
    
  } catch (error) {
     if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError('Invalid token'));
    } else {
      next(error);
    }
  }
};
