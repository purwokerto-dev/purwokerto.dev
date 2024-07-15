// pages/api/users/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, EventBadge } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // Fetch a single eventBadge
    try {
        const eventBadge: EventBadge | null = await prisma.eventBadge.findUnique({
            where: { id: params.id },
        });
        return NextResponse.json(eventBadge, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Event Badge not found' }, { status: 400 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    // Check the session
    const session: any = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    const { event, badge, speaker } = await req.json();
    if (event) {
        // Find the event or throw an exception if not found
        const foundEvent = await prisma.event.findUnique({
            where: { id: event },
        });
        if (!foundEvent) {
            return NextResponse.json({ error: "event not found" }, { status: 400 });
        }
    }
    if (badge) {
        // Find the badge or throw an exception if not found
        const foundBadge = await prisma.badge.findUnique({
            where: { id: badge },
        });
        if (!foundBadge) {
            return NextResponse.json({ error: "badge not found" }, { status: 400 });
        }
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
        const updatedEventBadge: EventBadge = await prisma.eventBadge.update({
            where: { id: params.id },
            data: {
                ... (event ? { event } : {}),
                ... (badge ? { badge } : {}),
                ... (speaker ? { speaker } : {}),
                updatedAt: new Date(),
                updatedBy: session.user.id,
            },
        });
        return NextResponse.json(updatedEventBadge, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Event Badge not found' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session: any = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    // Delete an Event Badge
    try {
        await prisma.eventBadge.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Event Badge deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Event Badge not found' }, { status: 400 });
    }
}