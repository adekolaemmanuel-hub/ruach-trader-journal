import { Request, Response } from 'express';
import prisma from '../db/prismaClient';

export async function createTrade(req: Request, res: Response) {
  try {
    const userId = (req as any).userId as string;
    const payload = req.body;
    const t = await prisma.trade.create({ data: { userId, ...payload } });
    res.status(201).json(t);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function listTrades(req: Request, res: Response) {
  const userId = (req as any).userId as string;
  const trades = await prisma.trade.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  res.json({ data: trades });
}
