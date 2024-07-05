/*
  Warnings:

  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Socmed` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Socmed` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `email` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Socmed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Socmed` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME,
    "createdBy" TEXT,
    "updatedAt" DATETIME,
    "updatedBy" TEXT,
    CONSTRAINT "Admin_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Admin_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Admin" ("createdAt", "createdBy", "id", "name", "updatedAt", "updatedBy") SELECT "createdAt", "createdBy", "id", "name", "updatedAt", "updatedBy" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
CREATE TABLE "new_Socmed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME,
    "createdBy" TEXT,
    "updatedAt" DATETIME,
    "updatedBy" TEXT,
    CONSTRAINT "Socmed_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Socmed_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Socmed" ("createdAt", "createdBy", "id", "updatedAt", "updatedBy") SELECT "createdAt", "createdBy", "id", "updatedAt", "updatedBy" FROM "Socmed";
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
    CONSTRAINT "User_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "createdBy", "email", "githubLink", "id", "image", "linkedinLink", "name", "updatedAt", "updatedBy") SELECT "createdAt", "createdBy", "email", "githubLink", "id", "image", "linkedinLink", "name", "updatedAt", "updatedBy" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
