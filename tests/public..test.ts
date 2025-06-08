import request from 'supertest';
import app from '../src/server';
import { db } from '../src/config/database';
import { users } from '../src/models/schema';
import { sql } from 'drizzle-orm';
import { UserController } from '../src/controllers/userController';
import { UserService } from '../src/services/userService';
import { Request, Response } from 'express';

jest.mock('../src/services/userService');

const testUser = {
  email: 'testuser@example.com',
  password: 'TestPassword123!',
  firstName: 'Test',
  lastName: 'User'
};

const invalidUser = {
  email: 'bademail',
  password: 'short'
};


describe('Auth Routes', () => {
  beforeAll(async () => {
    await db.delete(users).where(sql`email = ${testUser.email}`);
  });

  afterAll(async () => {
    await db.delete(users).where(sql`email = ${testUser.email}`);
  });



  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app).post('/api/auth/register').send(testUser);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toMatchObject({
        email: testUser.email,
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        role: 'user',
        status: 'active'
      });
    });

    it('should not register if email already exists', async () => {
      const res = await request(app).post('/api/auth/register').send(testUser);
      expect([409, 500]).toContain(res.statusCode);
      expect(res.body).toHaveProperty('message');
    });

    it('should reject invalid registration data', async () => {
      const res = await request(app).post('/api/auth/register').send(invalidUser);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in a registered user', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: testUser.email,
        password: testUser.password
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toMatchObject({
        email: testUser.email,
        firstName: testUser.firstName
      });
    });

    it('should fail login with wrong password', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: testUser.email,
        password: 'wrongpassword'
      });
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message');
    });

    it('should fail login with non-existent email', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'nonexistent@example.com',
        password: 'anyPassword'
      });
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message');
    });

    it('should reject invalid login data', async () => {
      const res = await request(app).post('/api/auth/login').send({ email: 'bad' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });
});

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

const mockNext = jest.fn();

describe('UserController', () => {
  const fakeUser = {
    id: '1',
    email: 'test@test.com',
    password: 'hashed',
    firstName: 'Test',
    lastName: 'User',
    role: 'admin',
    status: 'active'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateUserRole', () => {
    it('should update user role successfully', async () => {
      const req = {
        params: { id: '2' },
        body: { role: 'user' },
        user: { id: '1', role: 'super_admin' }
      } as unknown as Request;
      const res = mockResponse();

      (UserService.canChangeRole as jest.Mock).mockReturnValue(true);
      (UserService.getUserById as jest.Mock).mockResolvedValue(fakeUser);
      (UserService.canModifyUser as jest.Mock).mockReturnValue(true);
      (UserService.updateUserRole as jest.Mock).mockResolvedValue({ ...fakeUser, role: 'user' });

      await UserController.updateUserRole(req, res, mockNext);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.objectContaining({ role: 'user', password: undefined })
      });
    });
  });

  describe('updateUserStatus', () => {
    it('should update user status successfully', async () => {
      const req = {
        params: { id: '2' },
        body: { status: 'inactive' },
        user: { id: '1', role: 'admin' }
      } as unknown as Request;
      const res = mockResponse();

      (UserService.getUserById as jest.Mock).mockResolvedValue(fakeUser);
      (UserService.canChangeStatus as jest.Mock).mockReturnValue(true);
      (UserService.updateUserStatus as jest.Mock).mockResolvedValue({ ...fakeUser, status: 'inactive' });

      await UserController.updateUserStatus(req, res, mockNext);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.objectContaining({ status: 'inactive', password: undefined })
      });
    });
  });

  describe('getUserProfile', () => {
    it('should get user profile if authorized', async () => {
      const req = {
        params: { id: '1' },
        user: { id: '1', role: 'user' }
      } as unknown as Request;
      const res = mockResponse();

      (UserService.getUserById as jest.Mock).mockResolvedValue(fakeUser);

      await UserController.getUserProfile(req, res, mockNext);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.objectContaining({ email: fakeUser.email, password: undefined })
      });
    });
  });

  describe('getAllUsers', () => {
    it('should return all users if super_admin', async () => {
      const req = {
        user: { id: '1', role: 'super_admin' }
      } as unknown as Request;
      const res = mockResponse();

      (UserService.getAllUsers as jest.Mock).mockResolvedValue([fakeUser]);

      await UserController.getAllUsers(req, res, mockNext);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: [expect.objectContaining({ email: fakeUser.email, password: undefined })]
      });
    });
  });
});
