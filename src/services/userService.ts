import { eq } from "drizzle-orm";
import { db } from "../config/database";
import { users } from "../models/schema";
import type { User, UserRole, UserStatus, AuthenticatedUser } from "../types";
import { AppError } from "../utils/errors";

export class UserService {
  static canModifyUser(
    currentUser: AuthenticatedUser,
    targetUser: User
  ): boolean {
    if (currentUser.id === targetUser.id) return false; // Can't modify self

    const roleHierarchy: Record<UserRole, number> = {
      user: 0,
      admin: 1,
      super_admin: 2,
    };

    return roleHierarchy[currentUser.role] > roleHierarchy[targetUser.role];
  }

  static canChangeRole(
    currentUser: AuthenticatedUser,
    newRole: UserRole
  ): boolean {
    return currentUser.role === "super_admin";
  }

  static canChangeStatus(
    currentUser: AuthenticatedUser,
    targetUser: User
  ): boolean {
    if (currentUser.id === targetUser.id) return false; // Can't deactivate self

    if (currentUser.role === "super_admin") return true;

    if (currentUser.role === "admin") {
      return targetUser.role === "user";
    }

    return false;
  }

  static async getUserById(id: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0] || null;
  }

  static async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  static async updateUserRole(id: string, role: UserRole): Promise<User> {
    const result = await db
      .update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    if (!result[0]) {
      throw new AppError("User not found", 404);
    }

    return result[0];
  }

  static async updateUserStatus(id: string, status: UserStatus): Promise<User> {
    const result = await db
      .update(users)
      .set({ status, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    if (!result[0]) {
      throw new AppError("User not found", 404);
    }

    return result[0];
  }
}
