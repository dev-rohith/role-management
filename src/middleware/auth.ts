import jwt from 'jsonwebtoken';
import type { Response, NextFunction } from 'express';
import { UserModel } from '../models/user';
import { UnauthorizedError } from '../utils/errors';
import { AuthenticatedRequest } from '../types';

export const authenticateToken = async (req: AuthenticatedRequest,res: Response,next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] as string;

    if (!token) {
      throw new UnauthorizedError('Access token required');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await UserModel.findById(decoded.userId);
    
    if (!user || user.status === 'inactive') {
      throw new UnauthorizedError('User not found or inactive');
    }

    req.user = user;
    next();
    
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError('Invalid token'));
    } else {
      next(error);
    }
  }
};
