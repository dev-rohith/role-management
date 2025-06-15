import { Request } from "express";
import { InsertUser } from "../models/schema";

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name?: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  token: string;
  user: Omit<User, "password">;
}

export type UserWithoutPassword = Omit<User, "password">;

export interface RegisterRequest
  extends Omit<
    InsertUser,
    "id" | "createdAt" | "updatedAt" | "status" | "role"
  > {
  password: string;
}

export type CreateUser = InsertUser;

export interface LoginResponse {
  token: string;
  user: UserWithoutPassword;
}

export type UserRole = "user" | "admin" | "super_admin";
export type UserStatus = "active" | "inactive";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface RequestWithUser extends Request {
  user: AuthenticatedUser;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
}

export interface UpdateRoleRequest {
  role: UserRole;
}

export interface UpdateStatusRequest {
  status: UserStatus;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;

  message?: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  statusCode: number;
}
