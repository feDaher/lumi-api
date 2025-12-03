import { z } from "zod";

export const createAddressSchema = z.object({
  street: z.string().min(3),
  houseNumber: z.string().nullable(),
  neighborhood: z.string().min(3),
  complement: z.string().optional().nullable(),
  zipCode: z.string().length(8),
  city: z.string().min(2),
  state: z.string().length(2),
  isPrimary: z.boolean().optional(),
});

export type AddressCreateDTO = z.infer<typeof createAddressSchema>;
