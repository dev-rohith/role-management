// src/middleware/authorize.ts
import type { Request, Response, NextFunction } from "express";
import type { UserRole } from "../../types/index.j";
import { UnauthorizedError, ForbiddenError } from "../utils/errors.js";

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new UnauthorizedError("Authentication required");
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError("Access forbidden");
    }

    next();
  };
};
