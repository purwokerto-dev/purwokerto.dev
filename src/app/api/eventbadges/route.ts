// pages/api/users/index.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, EventBadge } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // List all eventBadges
  try {
    const eventBadges: EventBadge[] = await prisma.eventBadge.findMany();
    return NextResponse.json(eventBadges, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

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