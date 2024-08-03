import { PrismaClient, Admin } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchAdmins(): Promise<Admin[]> {
  return await prisma.admin.findMany();
}