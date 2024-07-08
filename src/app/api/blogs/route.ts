// pages/api/users/index.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Blog } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // List all blogs
  try {
    const blogs: Blog[] = await prisma.blog.findMany();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  // Check the session
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) {
    // If there is no session or if the user is not an admin, return unauthorized
    return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
  }
  // Create a new blog
  const { title, body, tags } = await req.json();
  try {
    const newBlog: Blog = await prisma.blog.create({
      data: {
        title,
        body,
        createdBy: session.user.id,
      },
    });
    if (tags) {
      // Step 1: Delete all existing tags for the blog
      await prisma.tagsOnBlogs.deleteMany({
        where: {
          blogId: newBlog.id,
        },
      });
      // Step 2: Insert new tags for the blog
      await Promise.all(tags.map((tagId:string) => prisma.tagsOnBlogs.create({
        data: {
          blogId: newBlog.id,
          tagId: tagId,
          createdBy: session.user.id,
        },
      })));
    }
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}