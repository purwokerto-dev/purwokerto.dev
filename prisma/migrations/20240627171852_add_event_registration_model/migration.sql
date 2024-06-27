/*
  Warnings:

  - You are about to drop the column `badgeReward` on the `Event` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "EventBadge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "speaker" TEXT NOT NULL,
    "createdAt" DATETIME,
    "createdBy" TEXT,
    "updatedAt" DATETIME,
    "updatedBy" TEXT,
    CONSTRAINT "EventBadge_event_fkey" FOREIGN KEY ("event") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventBadge_badge_fkey" FOREIGN KEY ("badge") REFERENCES "Badge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventBadge_speaker_fkey" FOREIGN KEY ("speaker") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventBadge_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EventBadge_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EventRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "attend" INTEGER NOT NULL DEFAULT 0,
    "rsvp_link" TEXT NOT NULL,
    "createdAt" DATETIME,
    "createdBy" TEXT,
    "updatedAt" DATETIME,
    "updatedBy" TEXT,
    CONSTRAINT "EventRegistration_user_fkey" FOREIGN KEY ("user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventRegistration_event_fkey" FOREIGN KEY ("event") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventRegistration_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EventRegistration_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EventPoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventRegistration" TEXT NOT NULL,
    "eventBadge" TEXT NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME,
    "createdBy" TEXT,
    "updatedAt" DATETIME,
    "updatedBy" TEXT,
    CONSTRAINT "EventPoint_eventRegistration_fkey" FOREIGN KEY ("eventRegistration") REFERENCES "EventRegistration" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventPoint_eventBadge_fkey" FOREIGN KEY ("eventBadge") REFERENCES "EventBadge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventPoint_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EventPoint_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "quota" INTEGER,
    "place" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "duration" INTEGER,
    "description" TEXT,
    "fee" INTEGER,
    "createdAt" DATETIME,
    "createdBy" TEXT,
    "updatedAt" DATETIME,
    "updatedBy" TEXT,
    CONSTRAINT "Event_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Event_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("createdAt", "createdBy", "dateTime", "description", "duration", "fee", "id", "place", "quota", "title", "updatedAt", "updatedBy") SELECT "createdAt", "createdBy", "dateTime", "description", "duration", "fee", "id", "place", "quota", "title", "updatedAt", "updatedBy" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
