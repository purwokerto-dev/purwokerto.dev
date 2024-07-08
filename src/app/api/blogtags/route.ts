// pages/api/users/index.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, BlogTag } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // List all blog tags
  try {
    const blogTags: BlogTag[] = await prisma.blogTag.findMany();
    return NextResponse.json(blogTags, { status: 200 });
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
  // Create a new blog tag
  const { title } = await req.json();
  try {
    const newBlogTag: BlogTag = await prisma.blogTag.create({
      data: {
        title,
        createdBy: session.user.id,
      },
    });
    return NextResponse.json(newBlogTag, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}