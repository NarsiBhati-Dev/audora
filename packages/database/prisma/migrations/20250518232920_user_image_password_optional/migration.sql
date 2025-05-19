/*
  Warnings:

  - You are about to drop the `Studio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudioUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "Studio";

-- DropTable
DROP TABLE "StudioUser";
