import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import type { User, UserWithoutPassword } from "../types/index";

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  // TODO: Implement password comparison using bcrypt.compare
};


export const generateToken = (userId: string): string => {
  // TODO: Generate a JWT token signed with JWT_SECRET, expires in 24h
};

export const generateId = (): string => uuidv4();

export const excludePassword = (user: User): UserWithoutPassword => {
  // TODO: Return user object without the password field
  // Also ensure id is returned as a string
};

