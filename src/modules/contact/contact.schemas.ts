import { z } from "zod";

export const contactCreateSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  ddd: z.string()
    .regex(/^\d{2}$/, "DDD must have 2 digits"),
  phone: z.string()
    .regex(/^\d{4,5}-?\d{4}$/, "Invalid phone format"),
});

export const contactUpdateSchema = contactCreateSchema.partial();

export const contactParamsSchema = z.object({
  id: z.string().uuid(),
});
