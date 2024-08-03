import { PrismaClient, Badge } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchBadges(): Promise<Badge[]> {
  return await prisma.badge.findMany();
}