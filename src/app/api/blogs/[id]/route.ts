// pages/api/users/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Blog } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // Fetch a single blog
    try {
        const blog: Blog | null = await prisma.blog.findUnique({
            where: { id: params.id },
        });
        return NextResponse.json(blog, { status: 200 });
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
    const { title, body, draft, tags } = await req.json();
    try {
        const updatedBlog: Blog = await prisma.blog.update({
            where: { id: params.id },
            data: {
                ... (title ? { title } : {}),
                ... (body ? { body } : {}),
                ... (draft ? { draft } : {}),
                updatedAt: new Date(),
                updatedBy: session.user.id,
            },
        });
        if (tags) {
            // Step 1: Delete all existing tags for the blog
            await prisma.tagsOnBlogs.deleteMany({
                where: {
                    blogId: updatedBlog.id,
                },
            });
            // Step 2: Insert new tags for the blog
            await Promise.all(tags.map((tagId: string) => prisma.tagsOnBlogs.create({
                data: {
                    blogId: updatedBlog.id,
                    tagId: tagId,
                    createdBy: session.user.id,
                },
            })));
        }
        return NextResponse.json(updatedBlog, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
        // If there is no session or if the user is not an admin, return unauthorized
        return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
    }
    // Delete a blog
    try {
        await prisma.blog.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Blog tag deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Blog tag not found' }, { status: 400 });
    }
}