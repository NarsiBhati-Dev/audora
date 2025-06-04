-- DropIndex
DROP INDEX "Meeting_id_studioId_idx";

-- CreateIndex
CREATE INDEX "Meeting_id_studioId_studioToken_idx" ON "Meeting"("id", "studioId", "studioToken");
