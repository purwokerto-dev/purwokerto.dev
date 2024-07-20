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
  try {
    let badgesAndPoints: any = await prisma.$queryRaw`SELECT b.title, b.description, b.img, SUM(ep.point) as totalPoints
      FROM EventPoint ep
      JOIN EventBadge eb ON ep.eventBadge = eb.id
      JOIN Badge b ON eb.badge = b.id
      JOIN EventRegistration er ON ep.eventRegistration = er.id
      WHERE er.user = ${user}
      GROUP BY b.title
      ORDER BY totalPoints DESC`;
    let badges: any = await prisma.$queryRaw`SELECT title, description, img, 0 as totalPoints FROM Badge`;
    if (badgesAndPoints.length > 0) {
      badgesAndPoints = badgesAndPoints.map((badge: { totalPoints: BigInt; }) => ({ ...badge, totalPoints: Number(badge.totalPoints) }));
      badges = badges.map((badge: { totalPoints: BigInt; }) => ({ ...badge, totalPoints: Number(badge.totalPoints) }));

      // merge points with zero badges
      const mergedMap = new Map();
      badgesAndPoints.forEach((item: any) => {
        mergedMap.set(item.title, item);
      });
      badges.forEach((item: any) => {
        if (mergedMap.has(item.title)) {
          const existingItem = mergedMap.get(item.title);
          mergedMap.set(item.title, { ...existingItem, ...item, totalPoints: existingItem.totalPoints });
        } else {
          mergedMap.set(item.title, item);
        }
      });
      const mergedArray = Array.from(mergedMap.values());

      return NextResponse.json(mergedArray, { status: 200 });
    } else {
      return NextResponse.json({ error: "No data" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}