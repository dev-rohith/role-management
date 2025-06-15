import { drizzle } from "drizzle-orm/postgres-js";
import './env'
import postgres from "postgres";
import * as schema from "../models/schema";

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });

export async function checkDbConnection() {
  try {
    console.log("Database successfully connected");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

