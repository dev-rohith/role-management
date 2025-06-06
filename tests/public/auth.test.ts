// tests/public/auth.test.ts
import request from 'supertest';
import app from '../../src/server';
import { createTestUser, cleanupUsers } from '../setup';

describe('Authentication (Public Tests)', () => {
  beforeEach(async () => {
    await cleanupUsers();
  });

  test('should login with valid credentials', async () => {
    const user = await createTestUser({
      email: 'test@example.com',
      password: 'password123'
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).not.toHaveProperty('password');
  });

  test('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
  });

  test('should reject inactive user login', async () => {
    await createTestUser({
      email: 'inactive@example.com',
      status: 'inactive'
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'inactive@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(401);
  });
});