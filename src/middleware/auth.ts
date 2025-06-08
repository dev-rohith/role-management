import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user';
import { UnauthorizedError } from '../utils/errors';
import { User } from '../types/index';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    // TODO: Extract token from authHeader

    if (!token) {
      throw new UnauthorizedError('Access token required');
    }

    // TODO: Verify JWT token

    // TODO: Fetch user by ID from token payload

    // TODO: Check if user exists and is active

    // TODO: Attach user to req.user

    next();
  } catch (error) {
    // TODO: Handle JWT errors and forward other errors
  }
};
