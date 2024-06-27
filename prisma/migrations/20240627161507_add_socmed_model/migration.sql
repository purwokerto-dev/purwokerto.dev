-- CreateTable
CREATE TABLE "Socmed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" DATETIME,
    "createdBy" TEXT,
    "updatedAt" DATETIME,
    "updatedBy" TEXT,
    CONSTRAINT "Socmed_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Socmed_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
