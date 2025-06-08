import type { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import {
  comparePassword,
  generateToken,
  excludePassword,
  hashPassword,
} from "../utils/helpers";
import { loginSchema, registerSchema } from "../utils/validation";
import { ConflictError, UnauthorizedError, ValidationError } from "../utils/errors";
import type {
  CreateUser,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/index";

export const login = async (
  req: Request<LoginRequest>,
  res: Response<LoginResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError("Invalid email or password format");
    }

    const { email, password } = validation.data;

    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    if (user.status === "inactive") {
      throw new UnauthorizedError("Account is deactivated");
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const token = generateToken(user.id.toString());

    res.json({
      token,
      user: excludePassword(user),
    });

  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request<RegisterRequest>,
  res: Response<RegisterResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError("Invalid registration data");
    }

    const { email, password, firstName, lastName } = validation.data;

    const existingUser = await UserModel.findByEmail(email);
   if (existingUser) {
      throw new ConflictError('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    const userData: CreateUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: "user",
      status: "active",
    };

    const newUser = await UserModel.create(userData);

    const token = generateToken(newUser.id.toString());

    res.status(201).json({
      token,
      user: excludePassword(newUser),
    });
  } catch (error) {
    next(error);
  }
};
