// pages/api/users/index.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, EventPoint, EventRegistration } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/rsvp:
 *   get:
 *     tags:
 *       - Event
 *     description: Do a rsvp for a user
 *     parameters:
 *       - in: query
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID to filter by
 *       - in: query
 *         name: event
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID to filter by
 *     responses:
 *       200:
 *         description: Do a rsvp for a user
 */
export async function GET(req: NextRequest) {
  // Check the session
  const session: any = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) {
    // If there is no session or if the user is not an admin, return unauthorized
    return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
  }
  // Retrieve query parameters
  const user = req.nextUrl.searchParams.get('user');
  const event = req.nextUrl.searchParams.get('event');

  // Check if user is not null or an empty string
  if (!user || user.trim() === '') {
    return NextResponse.json({ error: "User parameter is required and cannot be empty" }, { status: 400 });
  }

  // Check if user is not null or an empty string
  if (!event || event.trim() === '') {
    return NextResponse.json({ error: "Event parameter is required and cannot be empty" }, { status: 400 });
  }

  // Find the event or throw an exception if not found
  const foundEvent = await prisma.event.findUnique({
    where: { id: event },
  });
  if (!foundEvent) {
    return NextResponse.json({ error: "event not found" }, { status: 400 });
  } else if (foundEvent.dateTime < new Date()) {
    return NextResponse.json({ error: "event has already passed" }, { status: 400 });
  }

  // Find the user or throw an exception if not found
  const foundUser = await prisma.user.findUnique({
    where: { id: user },
  });
  if (!foundUser) {
    return NextResponse.json({ error: "user not found" }, { status: 400 });
  }

  try {
    const eventRegistration = await prisma.eventRegistration.findFirst({
      where: { user, event },
    });

    if (!eventRegistration) {
      return NextResponse.json({ error: "Event registration not found" }, { status: 400 });
    }

    const eventBadges = await prisma.eventBadge.findMany({
      where: { event },
    });

    if (!eventBadges || eventBadges.length === 0) {
      return NextResponse.json({ error: "Terima kasih sudah mendaftar event, perlu diingat event ini tidak memiliki poin/badge sebagai reward." }, { status: 200 });
    }

    eventBadges.forEach(async (eventBadge) => {
      const getPoint = eventBadge.speaker === foundUser.id ? (Number(process.env.SPEAKER_POINT) || 3) : 1;
      const eventPoints = await prisma.eventPoint.findFirst({
        where: { 
          eventRegistration: eventRegistration.id,
          eventBadge: eventBadge.id
         },
      });
      if (eventPoints) {
        return;
      }
      const newEventPoint: EventPoint = await prisma.eventPoint.create({
        data: {
          eventRegistration: eventRegistration.id,
          eventBadge: eventBadge.id,
          point: getPoint,
          createdBy: session.user.id,
        },
      });
    });
    const updatedEventRegistration: EventRegistration = await prisma.eventRegistration.update({
        where: { id: eventRegistration.id },
        data: {
            attend: true,
        },
    });
    return NextResponse.json({ message: "Terima kasih sudah mendaftar event!"}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}