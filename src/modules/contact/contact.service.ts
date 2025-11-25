import { prisma } from "../../prisma";

export class ContactService {

  static async findAll(userId: string) {
    return prisma.contact.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async findById(userId: string, id: string) {
    const contact = await prisma.contact.findFirst({
      where: { id, userId },
    });

    if (!contact) throw { status: 404, message: "Contact not found" };

    return contact;
  }

  static async create(userId: string, data: any) {
    return prisma.contact.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  static async updateById(userId: string, id: string, data: any) {
    return prisma.contact.update({
      where: {
        id_userId: {
          id,
          userId,
        }
      },
      data,
    });
  }

  static async deleteById(userId: string, id: string) {
    return prisma.contact.delete({
      where: {
        id_userId: { id, userId },
      },
    });
  }
}
