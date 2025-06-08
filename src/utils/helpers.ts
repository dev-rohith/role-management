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
  return await bcrypt.compare(password, hash);
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "24h" });
};

export const generateId = (): string => uuidv4();

export const excludePassword = (user: User): UserWithoutPassword => {
  const { password, ...userWithoutPassword } = user;
  return {
    ...userWithoutPassword,
    id: user.id.toString() 
  };
};

