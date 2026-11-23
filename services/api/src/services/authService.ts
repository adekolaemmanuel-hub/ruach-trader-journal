import bcrypt from 'bcrypt';
import prisma from '../db/prismaClient';
import { signAccessToken, signRefreshToken } from '../utils/jwt';

export async function signup(email: string, password: string, displayName?: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('Email already registered');
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, passwordHash: hash, displayName } });
  const access = signAccessToken({ sub: user.id });
  const refresh = signRefreshToken({ sub: user.id });
  return { user, access, refresh };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error('Invalid credentials');
  const access = signAccessToken({ sub: user.id });
  const refresh = signRefreshToken({ sub: user.id });
  return { user, access, refresh };
}
