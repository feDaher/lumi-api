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
        //@ts-ignore
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
        //@ts-ignore
        id_userId: { id, userId },
      },
    });
  }

  static async search(userId: string, term: string) {
    return prisma.contact.findMany({
      where: {
        userId,
        OR: [
          { name: { contains: term, mode: "insensitive" }},
          { phone: { contains: term, mode: "insensitive" }},
        ]
      }
    })
  }

  static async getPaginated(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.contact.findMany({
        where: { userId },
        orderBy: { name: "asc" },
        skip,
        take: limit,
      }),
      prisma.contact.count({ where: { userId } }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      hasMore: total > page * limit,
    };
  }
}
