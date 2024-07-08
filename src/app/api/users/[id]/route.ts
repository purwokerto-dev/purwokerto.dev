// pages/api/users/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, User } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // Fetch a single user
    try {
        const user: User | null = await prisma.user.findUnique({
            where: { id: params.id },
        });
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    // Check the session
    const session = await getServerSession(authOptions);
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
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