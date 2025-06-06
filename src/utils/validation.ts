// src/utils/validation.ts
import { z } from 'zod';

export const roleSchema = z.enum(['user', 'admin', 'super_admin']);
export const statusSchema = z.enum(['active', 'inactive']);

export const updateRoleSchema = z.object({
  role: roleSchema
});

export const updateStatusSchema = z.object({
  status: statusSchema
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});