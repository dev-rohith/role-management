import request from 'supertest';
import app from '../src/server';
import { db } from '../src/config/database';
import { users } from '../src/models/schema';
import { generateToken, generateId } from '../src/utils/helpers';
import { eq } from 'drizzle-orm';

let superAdminToken: string;
let testUserId: string;
let superAdminId: string;

beforeAll(async () => {
  superAdminId = generateId();
  await db.insert(users).values({
    id: superAdminId,
    email: 'test.superadmin@test.com',
    password: 'hashedpassword',
    firstName: 'Test',
    lastName: 'SuperAdmin',
    role: 'super_admin',
    status: 'active'
  });
  superAdminToken = generateToken(superAdminId );

  testUserId = generateId();
  await db.insert(users).values({
    id: testUserId,
    email: 'test.user@test.com',
    password: 'hashedpassword', 
    firstName: 'Test',
    lastName: 'User',
    role: 'user',
    status: 'active'
  });
});

afterAll(async () => {
  await db.delete(users).where(eq(users.id, superAdminId));
  await db.delete(users).where(eq(users.id, testUserId));
});

afterEach(async () => {
  await db.delete(users).where(eq(users.email, 'testuser@example.com'));
});


describe('UserController Authorization & Validations', () => {
  test('GET /api/users/:id - should return 200 and user profile for super_admin', async () => {
    const res = await request(app)
      .get(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${superAdminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(testUserId);
    expect(res.body.data).not.toHaveProperty('password');
  });

  test('PUT /api/users/:id/role - should update user role to admin', async () => {
    const res = await request(app)
      .put(`/api/users/${testUserId}/role`)
      .set('Authorization', `Bearer ${superAdminToken}`)
      .send({ role: 'admin' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.role).toBe('admin');
  });

  test('PUT /api/users/:id/role - should fail with 400 if role is invalid', async () => {
    const res = await request(app)
      .put(`/api/users/${testUserId}/role`)
      .set('Authorization', `Bearer ${superAdminToken}`)
      .send({ role: 'invalid_role' });

    expect(res.status).toBe(400);
  });

  test('PUT /api/users/:id/status - should update user status to inactive', async () => {
    const res = await request(app)
      .put(`/api/users/${testUserId}/status`)
      .set('Authorization', `Bearer ${superAdminToken}`)
      .send({ status: 'inactive' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('inactive');
  });

  test('GET /api/users - should list all users for super_admin', async () => {
    const res = await request(app)
      .get(`/api/users`)
      .set('Authorization', `Bearer ${superAdminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0]).not.toHaveProperty('password');
  });

test('GET /api/users/:id - should return 403 for user accessing another user profile', async () => {
  const userToken = generateToken(testUserId );
const uniqueEmail = `user+${Date.now()}@test.com`;
  const anotherUserId = generateId();
  await db.insert(users).values({
    id: anotherUserId,
    email: uniqueEmail,
    password: 'hashedpassword',
    firstName: 'Another',
    lastName: 'User',
    role: 'user',
    status: 'active'
  });

  const res = await request(app)
    .get(`/api/users/${anotherUserId}`)
    .set('Authorization', `Bearer ${userToken}`);

  expect(res.status).toBe(401);

  await db.delete(users).where(eq(users.id, anotherUserId));
});

  test('GET /api/users/:id - should return 401 without token', async () => {
    const res = await request(app)
      .get(`/api/users/${testUserId}`);

    expect(res.status).toBe(401);
  });
});
