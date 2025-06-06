// src/controllers/authController.ts
import type { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.js';
import { comparePassword, generateToken, excludePassword } from '../utils/helpers.js';
import { loginSchema } from '../utils/validation.js';
import { UnauthorizedError, ValidationError } from '../utils/errors.js';
import type { LoginRequest, LoginResponse } from '../../types/index.js';

export const login = async (
  req: Request<{}, LoginResponse, LoginRequest>,
  res: Response<LoginResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError('Invalid email or password format');
    }

    const { email, password } = validation.data;

    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    if (user.status === 'inactive') {
      throw new UnauthorizedError('Account is deactivated');
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = generateToken(user.id);
    
    res.json({
      token,
      user: excludePassword(user)
    });
  } catch (error) {
    next(error);
  }
};