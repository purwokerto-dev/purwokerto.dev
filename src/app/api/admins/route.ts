// pages/api/users/index.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Admin } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // Check the session
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) {
    // If there is no session or if the user is not an admin, return unauthorized
    return NextResponse.json({ error: "Access unauthorized" }, { status: 403 });
  }
  // List all admins
  try {
    const admins: Admin[] = await prisma.admin.findMany();
    return NextResponse.json(admins, { status: 200 });
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
  // Create a new admin
  const { email } = await req.json();
  try {
    const newAdmin: Admin = await prisma.admin.create({
      data: {
        email,
        createdBy: session.user.id,
      },
    });
    return NextResponse.json(newAdmin, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}