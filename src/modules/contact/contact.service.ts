import { prisma } from "../../prisma";
import { contactCreateSchema, contactUpdateSchema } from "./contact.schemas";

export class ContactService {
  static async read() {
    return prisma.contact.findMany({
      orderBy: { criadoEm: "desc" },
    });
  }

  static async create(data: unknown) {
    const payload = contactCreateSchema.parse(data);

    return prisma.contact.create({
      data: payload,
    });
  }

  static async update(id: string, data: unknown) {
    const payload = contactUpdateSchema.parse(data);

    return prisma.contact.update({
      where: { id },
      data: payload,
    });
  }

  static async delete(id: string) {
    return prisma.contact.delete({
      where: { id },
    });
  }
}
