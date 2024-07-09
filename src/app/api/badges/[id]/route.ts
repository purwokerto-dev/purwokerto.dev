// pages/api/users/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Badge } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";
import { mkdir, writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // Fetch a single badge
    try {
        const badge: Badge | null = await prisma.badge.findUnique({
            where: { id: params.id },
        });
        return NextResponse.json(badge, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Badge not found' }, { status: 400 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    // Check the session
    const session = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    const { title, description, img } = await req.json();
    try {
        let imgURL = '';
        if (img) {
            // Decode the base64 image
            const match = img.match(/^data:image\/(png|jpg|jpeg|webp|svg\+xml);base64,(.*)$/);
            if (!match) {
                throw new Error('Invalid image data');
            }
            const mimeType = match[1];
            const ext = mimeType.split('+')[0];
            const filename = `${uuidv4()}.${ext}`;
            const buffer = Buffer.from(match[2], 'base64');

            // Save the image to the public/badges folder
            // Ensure the badges directory exists
            const dirPath = join(process.cwd(), 'public', 'badges');
            await mkdir(dirPath, { recursive: true });

            const filePath = join(process.cwd(), 'public', 'badges', filename);
            await writeFile(filePath, buffer);

            // Construct the image URL
            imgURL = `/badges/${filename}`;

            // delete old image
            const badge = await prisma.badge.findUnique({
                where: { id: params.id },
            });
            if (badge && badge.img) {
                const oldFilename = badge.img.split('/').pop();
                if (oldFilename) {
                    const oldFilePath = join(process.cwd(), 'public', 'badges', oldFilename);
                    try {
                        await unlink(oldFilePath);
                    } catch (error) {
                        console.error(`Failed to delete old image: ${error}`);
                    }
                }
            }
        }
        const updatedBadge: Badge = await prisma.badge.update({
            where: { id: params.id },
            data: {
                ... (title ? { title } : {}),
                ... (description ? { description } : {}),
                ... (imgURL ? { img: imgURL } : {}),
                updatedAt: new Date(),
                updatedBy: session.user.id,
            },
        });
        return NextResponse.json(updatedBadge, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Badge not found' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    // Delete a badge
    try {
        // delete old image
        const badge = await prisma.badge.findUnique({
            where: { id: params.id },
        });
        if (badge && badge.img) {
            const oldFilename = badge.img.split('/').pop();
            if (oldFilename) {
                const oldFilePath = join(process.cwd(), 'public', 'badges', oldFilename);
                try {
                    await unlink(oldFilePath);
                } catch (error) {
                    console.error(`Failed to delete old image: ${error}`);
                }
            }
        }
        // delete the badge itself
        await prisma.badge.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Badge deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Badge not found' }, { status: 400 });
    }
}