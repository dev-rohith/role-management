import { db } from "./database.js";
import { users, type SelectUser, type InsertUser } from "./schema.js";
import { eq } from "drizzle-orm";
import type { User, CreateUserData } from "../../types/index.js";

export class UserModel {
  static async findById(id: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0] || null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0] || null;
  }

  static async findAll(): Promise<User[]> {
    return await db.select().from(users);
  }

  static async create(userData: InsertUser): Promise<User> {
    const result = await db.insert(users).values(userData).returning();
    return result[0]!;
  }

  static async updateById(
    id: string,
    updates: Partial<SelectUser>
  ): Promise<User | null> {
    const result = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0] || null;
  }
}
