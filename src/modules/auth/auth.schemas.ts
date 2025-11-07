import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(2),
  cpf: z.string().min(11).max(14),
  email: z.string().email(),
  password: z.string().min(6),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
