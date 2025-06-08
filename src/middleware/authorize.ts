// src/middleware/authorize.ts
import type { Response, NextFunction } from "express";
import type { UserRole } from "../types/index";
import { UnauthorizedError, ForbiddenError } from "../utils/errors";
import { AuthenticatedRequest } from "./auth";

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest , res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new UnauthorizedError("Authentication required");
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError("Access forbidden");
    }

    next();
  };
};
