// pages/api/users/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Admin } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admins/{id}:
 *   get:
 *     tags:
 *       - Admin
 *     description: Returns details of an admin [Requires admin privilege]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The admin's ID
 *     responses:
 *       200:
 *         description: Returns details of an admin
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // Check the session
    const session: any = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    // Fetch a single admin
    try {
        const admin: Admin | null = await prisma.admin.findUnique({
            where: { id: params.id },
        });
        if (!admin) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 400 });
        }
        return NextResponse.json(admin, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Admin not found' }, { status: 400 });
    }
}

/**
 * @swagger
 * /api/admins/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     description: Modify details of an admin [Requires admin privilege]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The admin's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["email"]
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the admin
 *     responses:
 *       200:
 *         description: Returns details of a modified admin
 */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    // Check the session
    const session: any = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    const { email } = await req.json();
    try {
        const updatedAdmin: Admin = await prisma.admin.update({
            where: { id: params.id },
            data: {
                email,
                updatedAt: new Date(),
                updatedBy: session.user.id,
            },
        });
        return NextResponse.json(updatedAdmin, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Admin not found' }, { status: 400 });
    }
}

/**
 * @swagger
 * /api/admins/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     description: Delete an admin [Requires admin privilege]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The admin's ID
 *     responses:
 *       200:
 *         description: Returns details of a deleted admin
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session: any = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    // Delete a user
    try {
        await prisma.admin.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Admin deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Admin not found' }, { status: 400 });
    }
}