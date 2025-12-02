import { prisma } from '../../prisma';
import jwt from 'jsonwebtoken';
import { env } from '../../env';

const SESSION_EXPIRATION_IN_MS = 7 * 24 * 60 * 60 * 1000; 

export class SessionService {
  
  static async createSession(userId: string, token: string) {
    const expiresAt = new Date(Date.now() + SESSION_EXPIRATION_IN_MS);

    return prisma.session.create({
      data: {
        userId,
        token,
        expiresAt,
        active: true,
      },
    });
  }

  static async findSessionByToken(token: string) {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session) return null;

    if (!session.active) {
      return null;
    }

    if (session.expiresAt < new Date()) {
      await prisma.session.update({ where: { id: session.id }, data: { active: false } });
      return null;
    }

    await prisma.session.update({
        where: { id: session.id },
        data: { lastAccess: new Date() }
    });

    return session;
  }

  static async invalidateSession(token: string) {
    await prisma.session.update({
      where: { token },
      data: { active: false },
    });
  }
}