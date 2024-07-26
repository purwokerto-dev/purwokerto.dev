import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Event } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/userbadges:
 *   get:
 *     tags:
 *       - Badge
 *     description: Display badges for a user
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: user ID to filter by
 *     responses:
 *       200:
 *         description: Display the users badge earnings and their points
 */
export async function GET(req: NextRequest) {
  // List all badges & points
  const user = req.nextUrl.searchParams.get('user');
  let badgesAndPoints: any;

  try {
    if (user) {
      badgesAndPoints = await prisma.$queryRaw`
        SELECT b.id as badgeId, b.title, b.description, b.img, SUM(ep.point) as totalPoints, u.id as userId, u.name, u.githubLink, u.linkedinLink, u.image, u.job
        FROM EventPoint ep
        JOIN EventBadge eb ON ep.eventBadge = eb.id
        JOIN Badge b ON eb.badge = b.id
        JOIN EventRegistration er ON ep.eventRegistration = er.id
        JOIN User u ON er.user = u.id
        WHERE er.user = ${user}
        GROUP BY badgeId, userId
        ORDER BY totalPoints DESC
      `;
    } else {
      badgesAndPoints = await prisma.$queryRaw`
        SELECT b.id as badgeId, b.title, b.description, b.img, SUM(ep.point) as totalPoints, u.id as userId, u.name, u.githubLink, u.linkedinLink, u.image, u.job
        FROM EventPoint ep
        JOIN EventBadge eb ON ep.eventBadge = eb.id
        JOIN Badge b ON eb.badge = b.id
        JOIN EventRegistration er ON ep.eventRegistration = er.id
        JOIN User u ON er.user = u.id
        GROUP BY badgeId, userId
        ORDER BY totalPoints DESC
      `;
    }
    if (badgesAndPoints.length > 0) {
      badgesAndPoints = badgesAndPoints.map((badge: { totalPoints: BigInt; }) => ({ ...badge, totalPoints: Number(badge.totalPoints) }));

      return NextResponse.json(badgesAndPoints, { status: 200 });
    } else {
      return NextResponse.json({ error: "No data" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}