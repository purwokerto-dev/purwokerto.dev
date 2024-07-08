// pages/api/users/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Admin } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // Check the session
    const session = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    // Fetch a single admin
    try {
        const admin: Admin | null = await prisma.admin.findUnique({
            where: { id: params.id },
        });
        return NextResponse.json(admin, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Admin not found' }, { status: 400 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    // Check the session
    const session = await getServerSession(authOptions);
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
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