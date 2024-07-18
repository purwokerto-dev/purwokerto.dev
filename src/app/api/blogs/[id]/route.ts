// pages/api/users/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Blog } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     tags:
 *       - Blog
 *     description: Returns details of a blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog's ID
 *     responses:
 *       200:
 *         description: Returns details of a blog
 */
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

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     tags:
 *       - Blog
 *     description: Modify details of a blog [Requires admin privilege]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the blog
 *               body:
 *                 type: string
 *                 description: Body of the blog
 *               draft:
 *                 type: number
 *                 description: 1 for draft, 2 for ready, 3 for published
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: array of tag ids (array of string)
 *     responses:
 *       200:
 *         description: Returns details of a modified blog
 */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    // Check the session
    const session: any = await getServerSession(authOptions);
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

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     tags:
 *       - Blog
 *     description: Delete a blog [Requires admin privilege]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog's ID
 *     responses:
 *       200:
 *         description: Returns details of a deleted blog
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session: any = await getServerSession(authOptions);
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