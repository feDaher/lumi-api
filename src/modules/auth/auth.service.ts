import { prisma } from '../../prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../env';

export async function signUp(name: string, email: string, password: string) {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw { status: 409, name: 'Conflict', message: 'Email already registered' };

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, password: hash } });
  const token = jwt.sign({ sub: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
  return { user: { id: user.id, name: user.name, email: user.email }, token };
}

export async function signIn(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 401, name: 'Unauthorized', message: 'Invalid credentials' };

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw { status: 401, name: 'Unauthorized', message: 'Invalid credentials' };

  const token = jwt.sign({ sub: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
  return { user: { id: user.id, name: user.name, email: user.email }, token };
}
