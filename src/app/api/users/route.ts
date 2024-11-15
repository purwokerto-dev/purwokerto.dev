import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, User } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";
import { fetchUsers } from './fetchUsers';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - User
 *     description: Returns list of users
 *     responses:
 *       200:
 *         description: list of users
 */
export async function GET(req: NextRequest) {
  // List all users
  try {
    const users: User[] = await fetchUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - User
 *     description: Create new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["name", "email"]
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               githubLink:
 *                 type: string
 *                 description: Github link
 *               linkedinLink:
 *                 type: string
 *                 description: Linkedin link
 *               image:
 *                 type: string
 *                 description: image url
 *               job:
 *                 type: string
 *                 description: Job title of the user
 *     responses:
 *       201:
 *         description: Create new user
 */
export async function POST(req: NextRequest) {
  // Check the session
  const session: any = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) {
    // If there is no session or if the user is not an admin, return unauthorized
    return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
  }
  // Create a new user
  const { name, email, githubLink, linkedinLink, image, job } = await req.json();
  try {
    const newUser: User = await prisma.user.create({
      data: {
        name,
        email,
        ... (githubLink ? { githubLink } : {}),
        ... (linkedinLink ? { linkedinLink } : {}),
        ... (image ? { image } : {}),
        ... (job ? { job } : {}),
        createdBy: session.user.id,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}