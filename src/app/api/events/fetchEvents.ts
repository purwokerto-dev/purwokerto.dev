import { PrismaClient, Event } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchEvents(limit?: number, open?: boolean): Promise<Event[]> {
  return await prisma.event.findMany({
    ...(limit ? { take: limit } : {}),
    ...(open ? { where: { dateTime: { gte: new Date() } } } : {})
  });
}