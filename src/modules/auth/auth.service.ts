import { prisma } from '../../prisma.js';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../../env.js';

export async function signUp(name: string, cpf: string, email: string, password: string) {
  const existsEmail = await prisma.user.findUnique({ where: { email } });
  if (existsEmail) throw { status: 409, name: 'Conflict', message: 'Email already registered' };

  const existsCpf = await prisma.user.findUnique({ where: { cpf } });
  if (existsCpf) throw { status: 409, name: 'Conflict', message: 'Cpf already registered'};

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({ data: { name, cpf ,email, password: hash } });
  const token = jwt.sign({ sub: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn']});

  return { user: { id: user.id, name: user.name, cpf: user.cpf ,email: user.email }, token };
}

export async function signIn(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 401, name: 'Unauthorized', message: 'Invalid credentials' };

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw { status: 401, name: 'Unauthorized', message: 'Invalid credentials' };

  const token = jwt.sign({ sub: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn']});

  return { user: { id: user.id, name: user.name, cpf: user.cpf ,email: user.email }, token };
}
