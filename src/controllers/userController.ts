// src/controllers/userController.ts
import type { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.js";
import { updateRoleSchema, updateStatusSchema } from "../utils/validation.js";
import { excludePassword } from "../utils/helpers.js";
import {
  ValidationError,
  ForbiddenError,
  NotFoundError,
} from "../utils/errors.js";
import type {
  UpdateUserRoleData,
  UpdateUserStatusData,
  UserWithoutPassword,
  UserRole,
} from "../../types/index.js";

export const updateUserRole = async (
  req: Request<{ id: string }, UserWithoutPassword, UpdateUserRoleData>,
  res: Response<UserWithoutPassword>,
  next: NextFunction
): Promise<void> => {
  try {
    // TODO: Implement role update logic
    // Requirements:
    // - Only super admin can update roles
    // - Validate the new role using updateRoleSchema
    // - Cannot change own role
    // - Find target user and validate they exist
    // - Update the user's role
    // - Return updated user without password

    res.status(501).json({ error: "Not implemented" } as any);
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (
  req: Request<{ id: string }, UserWithoutPassword, UpdateUserStatusData>,
  res: Response<UserWithoutPassword>,
  next: NextFunction
): Promise<void> => {
  try {
    // TODO: Implement status update logic
    // Requirements:
    // - Super admin can activate/deactivate anyone
    // - Admin can only deactivate regular users (not reactivate)
    // - Cannot deactivate yourself
    // - Validate the new status using updateStatusSchema
    // - Check permissions based on current user role and target user role
    // - Update the user's status
    // - Return updated user without password

    res.status(501).json({ error: "Not implemented" } as any);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (
  req: Request<{ id: string }>,
  res: Response<UserWithoutPassword>,
  next: NextFunction
): Promise<void> => {
  try {
    // TODO: Implement get user profile logic
    // Requirements:
    // - Users can only view their own profile
    // - Admins and super admins can view any profile
    // - Return user without password
    // - Return 404 if user not found
    // - Check authorization based on current user role and requested user id

    res.status(501).json({ error: "Not implemented" } as any);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response<UserWithoutPassword[]>,
  next: NextFunction
): Promise<void> => {
  try {
    // TODO: Implement get all users logic
    // Requirements:
    // - Only admins and super admins can access
    // - Return all users without passwords
    // - Use authorizeRoles middleware or implement authorization check
    // - Map all users to exclude passwords

    res.status(501).json({ error: "Not implemented" } as any);
  } catch (error) {
    next(error);
  }
};
