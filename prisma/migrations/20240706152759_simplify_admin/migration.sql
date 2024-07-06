/*
  Warnings:

  - You are about to drop the column `image` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Admin` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME,
    "createdBy" TEXT,
    "updatedAt" DATETIME,
    "updatedBy" TEXT,
    CONSTRAINT "Admin_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Admin_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Admin" ("createdAt", "createdBy", "email", "id", "updatedAt", "updatedBy") SELECT "createdAt", "createdBy", "email", "id", "updatedAt", "updatedBy" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
CREATE TABLE "new_Badge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "createdAt" DATETIME,
    "createdBy" TEXT,
    "updatedAt" DATETIME,
    "updatedBy" TEXT,
    CONSTRAINT "Badge_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Badge_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Badge" ("createdAt", "createdBy", "description", "id", "img", "title", "updatedAt", "updatedBy") SELECT "createdAt", "createdBy", "description", "id", "img", "title", "updatedAt", "updatedBy" FROM "Badge";
DROP TABLE "Badge";
ALTER TABLE "new_Badge" RENAME TO "Badge";
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "quota" INTEGER,
    "place" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "duration" INTEGER,
    "description" TEXT,
    "banner" TEXT,
    "map" TEXT,
    "fee" INTEGER,
    "createdAt" DATETIME,
    "createdBy" TEXT,
    "updatedAt" DATETIME,
    "updatedBy" TEXT,
    CONSTRAINT "Event_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Event_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("banner", "createdAt", "createdBy", "dateTime", "description", "duration", "fee", "id", "map", "place", "quota", "title", "updatedAt", "updatedBy") SELECT "banner", "createdAt", "createdBy", "dateTime", "description", "duration", "fee", "id", "map", "place", "quota", "title", "updatedAt", "updatedBy" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE TABLE "new_EventBadge" (
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
    CONSTRAINT "EventBadge_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EventBadge_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EventBadge" ("badge", "createdAt", "createdBy", "event", "id", "speaker", "updatedAt", "updatedBy") SELECT "badge", "createdAt", "createdBy", "event", "id", "speaker", "updatedAt", "updatedBy" FROM "EventBadge";
DROP TABLE "EventBadge";
ALTER TABLE "new_EventBadge" RENAME TO "EventBadge";
CREATE TABLE "new_EventPoint" (
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
    CONSTRAINT "EventPoint_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EventPoint_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EventPoint" ("createdAt", "createdBy", "eventBadge", "eventRegistration", "id", "point", "updatedAt", "updatedBy") SELECT "createdAt", "createdBy", "eventBadge", "eventRegistration", "id", "point", "updatedAt", "updatedBy" FROM "EventPoint";
DROP TABLE "EventPoint";
ALTER TABLE "new_EventPoint" RENAME TO "EventPoint";
CREATE TABLE "new_EventRegistration" (
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
    CONSTRAINT "EventRegistration_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EventRegistration_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EventRegistration" ("attend", "createdAt", "createdBy", "event", "id", "rsvp_link", "updatedAt", "updatedBy", "user") SELECT "attend", "createdAt", "createdBy", "event", "id", "rsvp_link", "updatedAt", "updatedBy", "user" FROM "EventRegistration";
DROP TABLE "EventRegistration";
ALTER TABLE "new_EventRegistration" RENAME TO "EventRegistration";
CREATE TABLE "new_Socmed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME,
    "createdBy" TEXT,
    "updatedAt" DATETIME,
    "updatedBy" TEXT,
    CONSTRAINT "Socmed_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Socmed_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Socmed" ("createdAt", "createdBy", "id", "type", "updatedAt", "updatedBy", "url") SELECT "createdAt", "createdBy", "id", "type", "updatedAt", "updatedBy", "url" FROM "Socmed";
DROP TABLE "Socmed";
ALTER TABLE "new_Socmed" RENAME TO "Socmed";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "githubLink" TEXT,
    "linkedinLink" TEXT,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "profesi" TEXT,
    "createdAt" DATETIME,
    "createdBy" TEXT,
    "updatedAt" DATETIME,
    "updatedBy" TEXT,
    CONSTRAINT "User_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "createdBy", "email", "githubLink", "id", "image", "linkedinLink", "name", "profesi", "updatedAt", "updatedBy") SELECT "createdAt", "createdBy", "email", "githubLink", "id", "image", "linkedinLink", "name", "profesi", "updatedAt", "updatedBy" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
