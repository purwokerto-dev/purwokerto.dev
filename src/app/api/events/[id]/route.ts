// pages/api/users/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Event } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";
import { mkdir, writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // Fetch a single event
    try {
        const event: Event | null = await prisma.event.findUnique({
            where: { id: params.id },
        });
        return NextResponse.json(event, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Event not found' }, { status: 400 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    // Check the session
    const session: any = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    const { title, place, dateTime, quota, duration, description, banner, map, fee, hidden } = await req.json();
    try {
        let bannerURL = '';
        if (banner) {
            // Decode the base64 image
            const match = banner.match(/^data:image\/(png|jpg|jpeg|webp|svg\+xml);base64,(.*)$/);
            if (!match) {
                throw new Error('Invalid image data');
            }
            const mimeType = match[1];
            const ext = mimeType.split('+')[0];
            const filename = `${uuidv4()}.${ext}`;
            const buffer = Buffer.from(match[2], 'base64');

            // Save the image to the public/banners folder
            // Ensure the banners directory exists
            const dirPath = join(process.cwd(), 'public', 'banners');
            await mkdir(dirPath, { recursive: true });

            const filePath = join(process.cwd(), 'public', 'banners', filename);
            await writeFile(filePath, buffer);

            // Construct the image URL
            bannerURL = `/banners/${filename}`;

            // delete old banner
            const event = await prisma.event.findUnique({
                where: { id: params.id },
            });
            if (event && event.banner) {
                const oldFilename = event.banner.split('/').pop();
                if (oldFilename) {
                    const oldFilePath = join(process.cwd(), 'public', 'banners', oldFilename);
                    try {
                        await unlink(oldFilePath);
                    } catch (error) {
                        console.error(`Failed to delete old banner: ${error}`);
                    }
                }
            }
        }
        const updatedEvent: Event = await prisma.event.update({
            where: { id: params.id },
            data: {
                ... (title ? { title } : {}),
                ... (place ? { place } : {}),
                ... (dateTime ? { dateTime } : {}),
                ... (quota ? { quota } : {}),
                ... (duration ? { duration } : {}),
                ... (description ? { description } : {}),
                ... (bannerURL ? { banner: bannerURL } : {}),
                ... (map ? { map } : {}),
                ... (fee ? { fee } : {}),
                ... (hidden ? { hidden } : {}),
                updatedBy: session.user.id,
            },
        });
        return NextResponse.json(updatedEvent, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Event not found' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session: any = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    // Delete an event
    try {
        // delete old banner
        const event = await prisma.event.findUnique({
            where: { id: params.id },
        });
        if (event && event.banner) {
            const oldFilename = event.banner.split('/').pop();
            if (oldFilename) {
                const oldFilePath = join(process.cwd(), 'public', 'banners', oldFilename);
                try {
                    await unlink(oldFilePath);
                } catch (error) {
                    console.error(`Failed to delete old banner: ${error}`);
                }
            }
        }
        // delete the event itself
        await prisma.event.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Event deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Event not found' }, { status: 400 });
    }
}