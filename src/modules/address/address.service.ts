import { prisma } from "../../prisma";
import { AddressCreateDTO } from "./address.schema";

export class AddressService {
  static getPrimary(userId: string) {
    return prisma.address.findFirst({
      where: { userId, isPrimary: true }
    });
  }

  static list(userId: string) {
    return prisma.address.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }

  static async create(userId: string, data: AddressCreateDTO) {
    if (data.isPrimary) {
      await prisma.address.updateMany({
        where: { userId },
        data: { isPrimary: false },
      });
    }

    return prisma.address.create({
      data: { ...data, userId },
    });
  }

  static update(id: string, userId: string, data: Partial<AddressCreateDTO>) {
    return prisma.address.update({
      where: { id },
      data,
    });
  }
}
