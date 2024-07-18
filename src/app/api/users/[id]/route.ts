// pages/api/users/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, User } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - User
 *     description: Returns details of a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: Returns details of a user
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // Fetch a single user
    try {
        const user: User | null = await prisma.user.findUnique({
            where: { id: params.id },
        });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }
}

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - User
 *     description: Modify details of a user [Requires admin privilege]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: name of the user
 *               email:
 *                 type: string
 *                 description: email of the user
 *               githubLink:
 *                 type: string
 *                 description: github link of the user
 *               linkedinLink:
 *                 type: string
 *                 description: linkedin link of the user
 *               image:
 *                 type: string
 *                 description: image url of the user
 *               job:
 *                 type: string
 *                 description: user's job
 *     responses:
 *       200:
 *         description: Returns details of a modified user
 */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    // Check the session
    const session: any = await getServerSession(authOptions);
    if (!session || (!session.user.isAdmin && (session.user.id !== params.id))) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    const { name, email, githubLink, linkedinLink, image, job } = await req.json();
    try {
        const updatedUser: User = await prisma.user.update({
            where: { id: params.id },
            data: {
                ... (name ? { name } : {}),
                ... (email ? { email } : {}),
                ... (githubLink ? { githubLink } : {}),
                ... (linkedinLink ? { linkedinLink } : {}),
                ... (image ? { image } : {}),
                ... (job ? { job } : {}),
                updatedAt: new Date(),
                updatedBy: session.user.id,
            },
        });
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }
}

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - User
 *     description: Delete a user [Requires admin privilege]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: Returns details of a deleted user
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session: any = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    // Delete a user
    try {
        await prisma.user.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'User deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }
}