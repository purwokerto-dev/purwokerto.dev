// pages/api/users/index.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Event } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/events:
 *   get:
 *     description: Display list of events
 *     responses:
 *       200:
 *         description: Display list of events
 */
export async function GET(req: NextRequest) {
  // List all events
  try {
    const events: Event[] = await prisma.event.findMany();
    return NextResponse.json(events, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

/**
 * @swagger
 * /api/events:
 *   post:
 *     description: Create new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["title", "place", "dateTime"]
 *             properties:
 *               title:
 *                 type: string
 *                 description: title of event
 *               place:
 *                 type: string
 *                 description: place of event
 *               dateTime:
 *                 type: number
 *                 description: date and time when event takes place
 *               quota:
 *                 type: string
 *                 description: max quota of event
 *               duration:
 *                 type: number
 *                 description: event duration (in hours)
 *               description:
 *                 type: string
 *                 description: long description of event
 *               banner:
 *                 type: string
 *                 description: banner image of event (base64) support png, jpg, jpeg, svg
 *               map:
 *                 type: string
 *                 description: map coordinate of event
 *               fee:
 *                 type: number
 *                 description: event fee
 *               hidden:
 *                 type: boolean
 *                 description: is this event hidden or open
 *     responses:
 *       201:
 *         description: Create new event
 */
export async function POST(req: NextRequest) {
  // Check the session
  const session: any = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) {
    // If there is no session or if the user is not an admin, return unauthorized
    return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
  }
  // Create a new event
  const { title, place, quota, dateTime, duration, description, banner, map, fee, hidden } = await req.json();
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
    }
    const newEvent: Event = await prisma.event.create({
      data: {
        title,
        place,
        dateTime,
        ... (quota ? { quota } : {}),
        ... (duration ? { duration } : {}),
        ... (description ? { description } : {}),
        ... (bannerURL ? { banner: bannerURL } : {}),
        ... (map ? { map } : {}),
        ... (fee ? { fee } : {}),
        ... (hidden ? { hidden } : {}),
        createdBy: session.user.id,
      },
    });
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}