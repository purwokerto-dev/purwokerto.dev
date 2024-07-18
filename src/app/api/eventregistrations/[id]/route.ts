// pages/api/users/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, EventRegistration } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/eventregistrations/{id}:
 *   get:
 *     tags:
 *       - Event
 *     description: Returns details of an event registration
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event registration's ID
 *     responses:
 *       200:
 *         description: Returns details of an event registration
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // Fetch a single Event Registration
    try {
        const eventRegistration: EventRegistration | null = await prisma.eventRegistration.findUnique({
            where: { id: params.id },
        });
        return NextResponse.json(eventRegistration, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Event Registration not found' }, { status: 400 });
    }
}

/**
 * @swagger
 * /api/eventregistrations/{id}:
 *   put:
 *     tags:
 *       - Event
 *     description: Modify details of an event registration [Requires admin privilege]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event registration's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID of user
 *               event:
 *                 type: string
 *                 description: ID of event
 *               rsvp_link:
 *                 type: string
 *                 description: rsvp_link of the event registration
 *     responses:
 *       200:
 *         description: Returns details of a modified event registration
 */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    // Check the session
    const session: any = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    const { user, event, rsvp_link } = await req.json();
    if (event) {
        // Find the event or throw an exception if not found
        const foundEvent = await prisma.event.findUnique({
            where: { id: event },
        });
        if (!foundEvent) {
            return NextResponse.json({ error: "event not found" }, { status: 400 });
        }
    }
    if (user) {
        // Find the user or throw an exception if not found
        const foundUser = await prisma.user.findUnique({
            where: { id: user },
        });
        if (!foundUser) {
            return NextResponse.json({ error: "user not found" }, { status: 400 });
        }
    }
    try {
        const updatedEventRegistration: EventRegistration = await prisma.eventRegistration.update({
            where: { id: params.id },
            data: {
                ... (event ? { event } : {}),
                ... (user ? { user } : {}),
                ... (rsvp_link ? { rsvp_link } : {}),
                updatedAt: new Date(),
                updatedBy: session.user.id,
            },
        });
        return NextResponse.json(updatedEventRegistration, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Event Registration not found' }, { status: 400 });
    }
}

/**
 * @swagger
 * /api/eventregistrations/{id}:
 *   delete:
 *     tags:
 *       - Event
 *     description: Delete an event registration [Requires admin privilege]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event registration's ID
 *     responses:
 *       200:
 *         description: Returns details of an event registration
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session: any = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    // Delete an Event Registration
    try {
        await prisma.eventRegistration.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Event Registration deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Event Registration not found' }, { status: 400 });
    }
}