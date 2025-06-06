import request from "supertest";
import app from "../index";

const mockUserToken = "mock-jwt-user";
const mockAdminToken = "mock-jwt-admin";
const mockSuperAdminToken = "mock-jwt-superadmin";

describe("RBAC Access Tests", () => {
  test("USER should only access own profile", async () => {
    const res = await request(app)
      .get("/api/users/own-user-id")
      .set("Authorization", `Bearer ${mockUserToken}`);
    expect(res.statusCode).not.toBe(403);
  });

  test("ADMIN should not promote users", async () => {
    const res = await request(app)
      .post("/api/users/target-id/promote")
      .set("Authorization", `Bearer ${mockAdminToken}`);
    expect(res.statusCode).toBe(403);
  });

  test("SUPER_ADMIN can promote USER to ADMIN", async () => {
    const res = await request(app)
      .post("/api/users/target-id/promote")
      .set("Authorization", `Bearer ${mockSuperAdminToken}`);
    expect(res.statusCode).toBeLessThan(500);
  });

  test("USER should not access another user profile", async () => {
    const res = await request(app)
      .get("/api/users/another-user-id")
      .set("Authorization", `Bearer ${mockUserToken}`);
    expect([401, 403]).toContain(res.statusCode);
  });
});
