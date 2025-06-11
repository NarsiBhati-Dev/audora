/*
  Warnings:

  - You are about to drop the column `studioName` on the `Studio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studioSlug]` on the table `Studio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `Studio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studioSlug` to the `Studio` table without a default value. This is not possible if the table is not empty.
  - The required column `token` was added to the `Studio` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Studio" DROP COLUMN "studioName",
ADD COLUMN     "studioSlug" TEXT NOT NULL,
ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Studio_studioSlug_key" ON "Studio"("studioSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_token_key" ON "Studio"("token");
