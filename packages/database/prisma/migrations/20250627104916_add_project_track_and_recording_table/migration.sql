/*
  Warnings:

  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Meeting` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecordingStatus" AS ENUM ('RECORDING', 'MERGING', 'COMPLETED', 'FAILED');

-- DropForeignKey
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_studioId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Meeting";

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "projectId" TEXT NOT NULL,
    "mergedVideoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recording" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "videoUrl" TEXT,
    "duration" INTEGER,
    "resolution" TEXT DEFAULT '1280x720',
    "thumbnailUrl" TEXT DEFAULT 'https://via.placeholder.com/150',
    "status" "RecordingStatus" NOT NULL DEFAULT 'RECORDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recording_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Track_id_projectId_idx" ON "Track"("id", "projectId");

-- CreateIndex
CREATE INDEX "Recording_id_trackId_idx" ON "Recording"("id", "trackId");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
