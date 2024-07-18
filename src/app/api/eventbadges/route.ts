// pages/api/users/index.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, EventBadge } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/eventbadges:
 *   get:
 *     tags:
 *       - Event
 *     description: Returns list of event badges
 *     parameters:
 *       - in: query
 *         name: idEvent
 *         schema:
 *           type: string
 *         description: Search event badges by event ID
 *     responses:
 *       200:
 *         description: list of event badges
 */
export async function GET(req: NextRequest) {
  // List all eventBadges
  const idEvent = req.nextUrl.searchParams.get('idEvent');
  try {
    const eventBadges: EventBadge[] = await prisma.eventBadge.findMany({
      ... (idEvent ? { where: { event: idEvent } } : {})
    });
    return NextResponse.json(eventBadges, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

/**
 * @swagger
 * /api/eventbadges:
 *   post:
 *     tags:
 *       - Event
 *     description: Create new event badge [requires admin level access]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["event", "badge"]
 *             properties:
 *               event:
 *                 type: string
 *                 description: event ID of new event badge
 *               badge:
 *                 type: string
 *                 description: badge ID of new event badge
 *               speaker:
 *                 type: string
 *                 description: speaker (user) ID of new event badge
 *     responses:
 *       201:
 *         description: Create new event baddge
 */
export async function POST(req: NextRequest) {
  // Check the session
  const session: any = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) {
    // If there is no session or if the user is not an admin, return unauthorized
    return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
  }
  // Create a new eventBadge
  const { event, badge, speaker } = await req.json();
  // Find the event or throw an exception if not found
  const foundEvent = await prisma.event.findUnique({
    where: { id: event },
  });
  if (!foundEvent) {
    return NextResponse.json({ error: "event not found" }, { status: 400 });
  }
  // Find the badge or throw an exception if not found
  const foundBadge = await prisma.badge.findUnique({
    where: { id: badge },
  });
  if (!foundBadge) {
    return NextResponse.json({ error: "badge not found" }, { status: 400 });
  }
  if (speaker) {
    // Find the speaker or throw an exception if not found
    const foundSpeaker = await prisma.user.findUnique({
      where: { id: speaker },
    });
    if (!foundSpeaker) {
      return NextResponse.json({ error: "speaker not found" }, { status: 400 });
    }
  }
  try {
    const eventBadge: EventBadge = await prisma.eventBadge.create({
      data: {
        event,
        badge,
        ... (speaker ? { speaker } : {}),
        createdBy: session.user.id,
      },
    });
    return NextResponse.json(eventBadge, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}