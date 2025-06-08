import { drizzle } from "drizzle-orm/postgres-js";
import './env'
import postgres from "postgres";
import * as schema from "../models/schema";

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });

export async function checkDbConnection() {
  try {
    const result = await client`SELECT 1`;
    console.log("✅ Database connected:", result);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}

