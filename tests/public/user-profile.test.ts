// tests/public/user-profile.test.ts
import request from 'supertest';
import app from '../../src/server';
import { createTestUser, cleanupUsers } from '../setup';
import { generateToken } from '../../src/utils/helpers';
import { User } from '../../src/types';

describe('User Profile Access (Public Tests)', () => {
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

  test('user should access own profile', async () => {
    const response = await request(app)
      .get(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(user.id);
    expect(response.body).not.toHaveProperty('password');
    expect(response.body.email).toBe(user.email);
  });

  test('user should not access other user profile', async () => {
    const response = await request(app)
      .get(`/api/users/${admin.id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(403);
  });

  test('admin should access any user profile', async () => {
    const response = await request(app)
      .get(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(user.id);
    expect(response.body).not.toHaveProperty('password');
  });

  test('super admin should access any profile', async () => {
    const response = await request(app)
      .get(`/api/users/${admin.id}`)
      .set('Authorization', `Bearer ${superAdminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(admin.id);
    expect(response.body).not.toHaveProperty('password');
  });

  test('should return 404 for non-existent user', async () => {
    const response = await request(app)
      .get('/api/users/non-existent-id')
      .set('Authorization', `Bearer ${superAdminToken}`);

    expect(response.status).toBe(404);
  });

  test('should reject request without token', async () => {
    const response = await request(app)
      .get(`/api/users/${user.id}`);

    expect(response.status).toBe(401);
  });
});