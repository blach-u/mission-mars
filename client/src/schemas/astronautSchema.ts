import { z } from 'zod';

export const astronautSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name cannot be longer than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name must contain only alphabetic characters and spaces'),
  role: z
    .string()
    .min(3, 'Role must be at least 3 characters long')
    .max(50, 'Role cannot be longer than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Role must contain only alphabetic characters and spaces'),
});

export type AstronautData = z.infer<typeof astronautSchema>;
