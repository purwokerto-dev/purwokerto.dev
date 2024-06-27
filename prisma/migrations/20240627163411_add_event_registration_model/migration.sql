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
