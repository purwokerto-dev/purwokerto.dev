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
    "banner" TEXT,
    "map" TEXT,
    "fee" INTEGER,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
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
    "speaker" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" DATETIME,
    "updatedBy" TEXT,
    CONSTRAINT "EventBadge_event_fkey" FOREIGN KEY ("event") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventBadge_badge_fkey" FOREIGN KEY ("badge") REFERENCES "Badge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventBadge_speaker_fkey" FOREIGN KEY ("speaker") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EventBadge_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EventBadge_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EventBadge" ("badge", "createdAt", "createdBy", "event", "id", "speaker", "updatedAt", "updatedBy") SELECT "badge", "createdAt", "createdBy", "event", "id", "speaker", "updatedAt", "updatedBy" FROM "EventBadge";
DROP TABLE "EventBadge";
ALTER TABLE "new_EventBadge" RENAME TO "EventBadge";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
