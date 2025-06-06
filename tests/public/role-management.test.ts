// tests/public/role-management.test.ts
import request from 'supertest';
import app from '../../src/server';
import { createTestUser, cleanupUsers } from '../setup';
import { generateToken } from '../../src/utils/helpers';
import { User } from '../../src/types';

describe('Role Management (Public Tests)', () => {
  let user: User, admin: User, superAdmin: User;
  let userToken: string, adminToken: string, superAdminToken: string;

  beforeEach(async () => {
    await cleanupUsers();
    
    user = await createTestUser({
      email: 'user@test.com',
      role: 'user'
    });
    
    admin = await createTestUser({
      email: 'admin@test.com',
      role: 'admin'
    });
    
    superAdmin = await createTestUser({
      email: 'superadmin@test.com',
      role: 'super_admin'
    });

    userToken = generateToken(user.id);
    adminToken = generateToken(admin.id);
    superAdminToken = generateToken(superAdmin.id);
  });

  test('super admin should promote user to admin', async () => {
    const response = await request(app)
      .put(`/api/users/${user.id}/role`)
      .set('Authorization', `Bearer ${'khfvjhf'}`)
    });
      
        // tests/setup.ts
import { db } from '../src/models/database';
import { users } from '../src/models/schema';
import { hashPassword, generateId } from '../src/utils/helpers';
import { CreateUserData, UserRole, UserStatus, User } from '../src/types';

interface TestUserData extends Partial<CreateUserData> {
  role?: UserRole;
  status?: UserStatus;
}

export const createTestUser = async (userData: TestUserData): Promise<User> => {
  const hashedPassword = await hashPassword(userData.password || 'password123');
  const user = {
    id: generateId(),
    email: userData.email!,
    password: hashedPassword,
    firstName: userData.firstName || 'Test',
    lastName: userData.lastName || 'User',
    role: userData.role || 'user' as UserRole,
    status: userData.status || 'active' as UserStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const result = await db.insert(users).values(user).returning();
  return result[0];
};

export const cleanupUsers = async (): Promise<void> => {
  await db.delete(users);
}
