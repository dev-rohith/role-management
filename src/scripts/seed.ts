import { UserModel } from "../models/user";
import { hashPassword, generateId } from "../utils/helpers";
import dotenv from "dotenv";
import type { CreateUserData } from "../types/index";

dotenv.config();

const seedUsers: Array<CreateUserData & { id: string }> = [
  {
    id: generateId(),
    email: "superadmin@test.com",
    password: "password123",
    firstName: "Super",
    lastName: "Admin",
    role: "super_admin",
    status: "active",
  },
  {
    id: generateId(),
    email: "admin1@test.com",
    password: "password123",
    firstName: "Admin",
    lastName: "One",
    role: "admin",
    status: "active",
  },
  {
    id: generateId(),
    email: "admin2@test.com",
    password: "password123",
    firstName: "Admin",
    lastName: "Two",
    role: "admin",
    status: "active",
  },
  {
    id: generateId(),
    email: "user1@test.com",
    password: "password123",
    firstName: "User",
    lastName: "One",
    role: "user",
    status: "active",
  },
  {
    id: generateId(),
    email: "user2@test.com",
    password: "password123",
    firstName: "User",
    lastName: "Two",
    role: "user",
    status: "active",
  },
];

async function seed(): Promise<void> {
  try {
    console.log("Seeding database...");

    for (const userData of seedUsers) {
      const hashedPassword = await hashPassword(userData.password);
      const existingUser = await UserModel.findByEmail(userData.email);
      if (existingUser) {
        console.log(
          `User with email ${userData.email} already exists. Skipping...`
        );
        continue;
      }
      await UserModel.create({
        ...userData,
        password: hashedPassword,
      });
      console.log(`Created user: ${userData.email}`);
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
