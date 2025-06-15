import type { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import { comparePassword, generateToken, excludePassword, hashPassword,} from "../utils/helpers";
import { loginSchema, registerSchema } from "../utils/validation";
import { ConflictError, UnauthorizedError, ValidationError } from "../utils/errors";
import type {CreateUser, LoginRequest, LoginResponse,RegisterRequest,RegisterResponse,} from "../types/index";


// NOTE:  Please check the types defined in `types/index.ts` before adding new ones.
//        Use the existing types where appropriate.
//        If needed, update or extend them to fit the current requirements.
//        This helps us assess your understanding of TypeScript types.

// NOTE: Carefully review all imported modules and how they are used in the code.
//        Understand the logic and context before making any changes.
//        This ensures that any modifications you make are accurate and consistent.


export const login = async (req: Request<LoginRequest>,res: Response<LoginResponse>,next: NextFunction): Promise<void> => {
  try {
    // TODO: Validate the request body using loginSchema
    // Expected req.body format: { email: string, password: string }
    // Use loginSchema.safeParse() method to validate
    // If validation fails, throw new ValidationError("Invalid email or password format")
    

    // TODO: Extract email and password from validated data
    // Get email and password from validation.data
    

    // TODO: Find user by email
    // Use UserModel.findByEmail() method
    // If user not found, throw new UnauthorizedError("Invalid credentials")
    

    // TODO: Check if user account is active
    // Check if user.status === "inactive"
    // If inactive, throw new UnauthorizedError("Account is deactivated")
    

    // TODO: Verify password
    // Use comparePassword() helper function to compare provided password with user.password
    // If password doesn't match, throw new UnauthorizedError("Invalid credentials")
    

    // TODO: Generate JWT token and send response
    // Use generateToken() helper with user.id.toString()
    // Send response with format: { token: string, user: UserObject (without password) }
    // Use excludePassword() helper to remove password from user object
    

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
    // TODO: Validate the request body using registerSchema
    // Expected req.body format: { email: string, password: string, firstName: string, lastName: string }
    // Use registerSchema.safeParse() method to validate
    // If validation fails, throw new ValidationError("Invalid registration data")
    

    // TODO: Extract user data from validated request
    // Get email, password, firstName, lastName from validation.data
    

    // TODO: Check if user already exists
    // Use UserModel.findByEmail() to check if user with this email exists
    // If user exists, throw new ConflictError('User already exists')
    

    // TODO: Hash the password
    // Use hashPassword() helper function to hash the plain text password
    

    // TODO: Create user data object
    // Create userData object with:
    // - id: generate using uuidv4()
    // - email: from request
    // - password: hashed password
    // - firstName: from request
    // - lastName: from request
    // - role: set to "user"
    // - status: set to "active"
    

    // TODO: Create new user in database
    // Use UserModel.create() method with userData
    

    // TODO: Generate token and send response
    // Generate JWT token using generateToken() with newUser.id.toString()
    // Send 201 status response with format: { token: string, user: UserObject (without password) }
    // Use excludePassword() helper to remove password from user object
    

  } catch (error) {
    next(error);
  }
};