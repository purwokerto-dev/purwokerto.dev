// pages/api/users/index.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Event } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { toZonedTime } from 'date-fns-tz';
import { fetchEvents } from './fetchEvents';


const prisma = new PrismaClient();

function convertEpochToDate(dateTime: number, timeZone: string = 'Asia/Jakarta'): Date {
  // Assuming any epoch time before January 1, 2030 is in seconds
  const thresholdInSeconds = new Date('2030-01-01').getTime() / 1000;
  
  // Check if the dateTime is in seconds (less than threshold)
  let date;
  if (dateTime < thresholdInSeconds) {
    // Convert seconds to milliseconds
    date = new Date(dateTime * 1000);
  } else {
    // Assume dateTime is already in milliseconds
    date = new Date(dateTime);
  }
  // Convert the date to the specified timezone
  return toZonedTime(date, timeZone);
}

/**
 * @swagger
 * /api/events:
 *   get:
 *     tags:
 *       - Event
 *     description: Display list of events
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Limit how many events to display
 *       - in: query
 *         name: open
 *         schema:
 *           type: boolean
 *         description: Display only open events
 *     responses:
 *       200:
 *         description: Display list of events
 */
export async function GET(req: NextRequest) {
  // List all events
  const limit = parseInt(req.nextUrl.searchParams.get('limit') ?? '');
  const open = req.nextUrl.searchParams.get('open') === 'true';
  try {
    const events: Event[] = await fetchEvents(limit ?? undefined, open ?? undefined);
    return NextResponse.json(events, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

/**
 * @swagger
 * /api/events:
 *   post:
 *     tags:
 *       - Event
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
 *                 type: number
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
        dateTime: convertEpochToDate(dateTime),
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