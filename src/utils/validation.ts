import { z } from 'zod';

const roleSchema = z.enum(['user', 'admin', 'super_admin']);
const statusSchema = z.enum(['active', 'inactive']);

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

export const validateUpdateRole = (data: any) => {
  const schema = z.object({
    role: roleSchema
  });

  return schema.safeParse(data);
};

export const validateUpdateStatus = (data: any) => {
  const schema = z.object({
    status: statusSchema
  });

  return schema.safeParse(data);
};

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

