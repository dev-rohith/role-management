import request from 'supertest';
import app from '../index';

const tokens = {
  USER: 'mock-jwt-user',
  ADMIN: 'mock-jwt-admin',
  SUPER_ADMIN: 'mock-jwt-superadmin',
};

describe('Hidden RBAC Tests', () => {
  test('SUPER_ADMIN should not be demoted', async () => {
    const res = await request(app)
      .post('/api/users/superadmin-id/demote')
      .set('Authorization', `Bearer ${tokens.SUPER_ADMIN}`);
    expect(res.statusCode).toBe([400, 403]); 
  });

  test('ADMIN should be able to view USERs but not ADMINs or SUPER_ADMINs', async () => {
    const resUser = await request(app)
      .get('/api/users/user-id')
      .set('Authorization', `Bearer ${tokens.ADMIN}`);
    expect(resUser.statusCode).toBe(200);

    const resAdmin = await request(app)
      .get('/api/users/admin-id')
      .set('Authorization', `Bearer ${tokens.ADMIN}`);
    expect([403, 401]).toContain(resAdmin.statusCode);

    const resSuper = await request(app)
      .get('/api/users/superadmin-id')
      .set('Authorization', `Bearer ${tokens.ADMIN}`);
    expect([403, 401]).toContain(resSuper.statusCode);
  });

  test('Access without token should be rejected', async () => {
    const res = await request(app).get('/api/users/any-id');
    expect(res.statusCode).toBe(401);
  });

  test('Invalid token should be rejected', async () => {
    const res = await request(app)
      .get('/api/users/any-id')
      .set('Authorization', `Bearer invalid.token.here`);
    expect(res.statusCode).toBe(401);
  });

  test('USER trying to promote another user should be denied', async () => {
    const res = await request(app)
      .post('/api/users/target-id/promote')
      .set('Authorization', `Bearer ${tokens.USER}`);
    expect(res.statusCode).toBe(403);
  });
});
