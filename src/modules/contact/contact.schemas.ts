import { z } from "zod"; 

export const contactCreateSchema = z.object({
  nome: z.string().min(2, "Nome muito curto"),

  ddd: z
    .string()
    .regex(/^\d{2}$/, "DDD deve ter 2 dígitos"),

  numero: z
    .string()
    .regex(/^\d{4,5}-?\d{4}$/, "Número de telefone inválido"),
});

export const contactUpdateSchema = contactCreateSchema.partial();

export const contactParamsSchema = z.object({
  id: z.string().uuid(),
});
