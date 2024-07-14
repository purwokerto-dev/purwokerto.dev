// pages/api/users/index.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Badge } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/badges:
 *   get:
 *     description: Returns list of badges
 *     responses:
 *       200:
 *         description: list of badges
 */
export async function GET(req: NextRequest) {
  // List all badges
  try {
    const badges: Badge[] = await prisma.badge.findMany();
    return NextResponse.json(badges, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

/**
 * @swagger
 * /api/badges:
 *   post:
 *     description: Create new badge
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["title", "description", "img"]
 *             properties:
 *               title:
 *                 type: string
 *                 description: title of badge
 *               description:
 *                 type: string
 *                 description: description of badge
 *               img:
 *                 type: string
 *                 description: image of badge (base64) support png, jpeg, jpg, svg
 *     responses:
 *       201:
 *         description: Create new badge
 */
export async function POST(req: NextRequest) {
  // Check the session
  const session: any = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) {
    // If there is no session or if the user is not an admin, return unauthorized
    return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
  }
  // Create a new badge
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
    }

    // Create a new badge with the image URL
    const newBadge: Badge = await prisma.badge.create({
      data: {
        title,
        description,
        img: imgURL,
        createdBy: session.user.id,
      },
    });
    return NextResponse.json(newBadge, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}