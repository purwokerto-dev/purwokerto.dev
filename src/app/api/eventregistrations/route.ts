// pages/api/users/index.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, EventRegistration } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/eventregistrations:
 *   get:
 *     tags:
 *       - Event
 *     description: Display list of event registrations
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: string
 *         description: Search event registrations by user ID
 *       - in: query
 *         name: idEvent
 *         schema:
 *           type: string
 *         description: Search event registrations by event ID
 *     responses:
 *       200:
 *         description: Display list of event registrations
 */
export async function GET(req: NextRequest) {
  // List all eventRegistrations
  const idUser = req.nextUrl.searchParams.get('idUser');
  const idEvent = req.nextUrl.searchParams.get('idEvent');
  try {
    const eventRegistrations: EventRegistration[] =
      await prisma.eventRegistration.findMany({
        ... (idUser || idEvent ? { where: { ... (idUser ? { user: idUser } : {}), ... (idEvent ? { event: idEvent } : {}) } } : {}),
        include: {
          erEvent: true,
          erUser: true,
        }
      });
    return NextResponse.json(eventRegistrations, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

/**
 * @swagger
 * /api/eventregistrations:
 *   post:
 *     tags:
 *       - Event
 *     description: Create new event registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["user", "event"]
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID user
 *               event:
 *                 type: string
 *                 description: ID event
 *     responses:
 *       201:
 *         description: Create new event registration
 */
export async function POST(req: NextRequest) {
  // Check the session
  const session: any = await getServerSession(authOptions);
  if (!session || !session.user) {
    // If there is no session or if the user is not an admin, return unauthorized
    return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
  }

  // Create a new eventRegistration
  const { user, event } = await req.json();

  // if user is not admin and not the same as the user in the request, return unauthorized
  if (!session.user.isAdmin && session.user.id !== user) {
    return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
  }
  // Find the event or throw an exception if not found
  const foundEvent = await prisma.event.findUnique({
    where: { id: event },
  });
  if (!foundEvent) {
    return NextResponse.json({ error: "event not found" }, { status: 400 });
  } else if (foundEvent.dateTime < new Date()) {
    return NextResponse.json(
      { error: "event has already passed" },
      { status: 400 }
    );
  }
  // Find the user or throw an exception if not found
  const foundUser = await prisma.user.findUnique({
    where: { id: user },
  });
  if (!foundUser) {
    return NextResponse.json({ error: "user not found" }, { status: 400 });
  }
  try {
    // check if user is already registered for the event
    const existingEventRegistration: EventRegistration | null =
      await prisma.eventRegistration.findFirst({
        where: {
          user: user,
          event: event,
        },
      });
    if (existingEventRegistration) {
      return NextResponse.json(
        { error: "User is already registered to the event" },
        { status: 400 }
      );
    }
    const eventRegistration: EventRegistration =
      await prisma.eventRegistration.create({
        data: {
          user,
          event,
          rsvp_link: "/my-events/status-rsvp?eventId=" + event + "&userId=" + user,
          createdBy: session.user.id,
        },
      });
    return NextResponse.json(eventRegistration, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
