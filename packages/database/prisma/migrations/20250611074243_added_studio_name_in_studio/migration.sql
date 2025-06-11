/*
  Warnings:

  - Added the required column `studioName` to the `Studio` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Studio_id_userId_idx";

-- AlterTable
ALTER TABLE "Studio" ADD COLUMN     "studioName" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Studio_id_userId_studioSlug_idx" ON "Studio"("id", "userId", "studioSlug");
