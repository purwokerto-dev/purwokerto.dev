// pages/api/users/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, User } from '@prisma/client';

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
    const { name, email } = await req.json();
    try {
      const updatedUser: User = await prisma.user.update({
        where: { id: params.id },
        data: {
          name,
          email,
        },
      });
      return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
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