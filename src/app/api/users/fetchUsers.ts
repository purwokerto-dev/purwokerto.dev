import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchUsers(): Promise<User[]> {
  return await prisma.user.findMany();
}