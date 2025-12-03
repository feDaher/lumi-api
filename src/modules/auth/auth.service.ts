import { prisma } from '../../prisma.js';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../../env.js';
import { SessionService } from '../sessions/sessions.service.js';

export class AuthService {
  async signUp(name: string, cpf: string, email: string, password: string) {
    const existsEmail = await prisma.user.findUnique({ where: { email } });
    if (existsEmail) throw { status: 409, name: 'Conflict', message: 'Email already registered' };

    const existsCpf = await prisma.user.findUnique({ where: { cpf } });
    if (existsCpf) throw { status: 409, name: 'Conflict', message: 'Cpf already registered'};

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({ data: { name, cpf ,email, password: hash } });

    return { user: { id: user.id, name: user.name, cpf: user.cpf ,email: user.email }};
  }

  async signIn(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        addresses: {
          where: { isPrimary: true },
          take: 1
        }
      }
    });

    if (!user) throw { status: 401, name: "Unauthorized", message: "Invalid credentials" };

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw { status: 401, name: "Unauthorized", message: "Invalid credentials" };

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"] }
    );

    await SessionService.createSession(user.id, token);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        address: user.addresses?.[0] ?? null
      },
      token
    };
  }

  static async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw { status: 404, message: "Usuário não encontrado" };
    }

    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) {
      throw { status: 401, message: "Senha atual incorreta" };
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed }
    });

    return true;
  }
}