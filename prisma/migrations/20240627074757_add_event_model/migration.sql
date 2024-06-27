-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "quota" INTEGER,
    "place" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "duration" INTEGER,
    "description" TEXT,
    "badgeReward" TEXT,
    "fee" INTEGER,
    "createdAt" DATETIME,
    "createdBy" TEXT,
    "updatedAt" DATETIME,
    "updatedBy" TEXT,
    CONSTRAINT "Event_badgeReward_fkey" FOREIGN KEY ("badgeReward") REFERENCES "Badge" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Event_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Event_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
