/*
  Warnings:

  - You are about to drop the column `roomId` on the `Meeting` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Meeting_roomId_key";

-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "roomId";
