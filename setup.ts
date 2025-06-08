import { db } from '../src/config/database';
import { users } from '../src/models/schema';
import { hashPassword, generateId } from '../src/utils/helpers';
import type { User, CreateUserData, UserRole, UserStatus } from '../src/types';

interface TestUserData extends Partial<CreateUserData> {
  email: string;
  role?: UserRole;
  status?: UserStatus;
}

export const createTestUser = async (userData: TestUserData): Promise<User> => {
  const hashedPassword = await hashPassword(userData.password || 'password123');
  const user = {
    id: generateId(),
    email: userData.email,
    password: hashedPassword,
    firstName: userData.firstName || 'Test',
    lastName: userData.lastName || 'User',
    role: userData.role || 'user',
    status: userData.status || 'active',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const result = await db.insert(users).values(user).returning();
  return result[0];
};

export const cleanupUsers = async (): Promise<void> => {
  await db.delete(users);
};
