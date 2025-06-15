import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest, UserRole } from "../types/index";
import { UnauthorizedError, ForbiddenError } from "../utils/errors";

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
