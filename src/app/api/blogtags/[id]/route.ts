// pages/api/users/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, BlogTag } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // Fetch a single blog tag
    try {
        const blogTag: BlogTag | null = await prisma.blogTag.findUnique({
            where: { id: params.id },
        });
        return NextResponse.json(blogTag, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Blog tag not found' }, { status: 400 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    // Check the session
    const session = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    const { title } = await req.json();
    try {
        const updatedAdmin: BlogTag = await prisma.blogTag.update({
            where: { id: params.id },
            data: {
                title,
                updatedAt: new Date(),
                updatedBy: session.user.id,
            },
        });
        return NextResponse.json(updatedAdmin, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Blog tag not found' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    // Delete a blog tag
    try {
        await prisma.blogTag.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Blog tag deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Blog tag not found' }, { status: 400 });
    }
}