// pages/api/users/index.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";

/**
 * @swagger
 * /api/httpcookies:
 *   get:
 *     tags:
 *       - Cookie
 *     description: Set http cookie
 *     parameters:
 *       - in: query
 *         name: op
 *         required: true
 *         schema:
 *           type: string
 *         description: operation to filter by (login, logout)
 *     responses:
 *       200:
 *         description: Set http cookie
 */
export async function GET(req: NextRequest, res: NextResponse) {
  // Check the session
  const op = req.nextUrl.searchParams.get('op');
  const session: any = await getServerSession(authOptions);
  console.log(op)

  if (op === 'login') {
    return NextResponse.json({ message: "Cookie has been set"}, { status: 200, headers: { 'Set-Cookie': `isAdmin=${session?.user?.isAdmin}; Path=/; HttpOnly; Secure; SameSite=Lax` } });
  } else if (op === 'logout') {
    return NextResponse.json({ message: "Cookie has been removed"}, { status: 200, headers: { 'Set-Cookie': `isAdmin=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax` } });
  }

}