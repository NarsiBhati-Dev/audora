-- CreateEnum
CREATE TYPE "RecordingType" AS ENUM ('VIDEO_AUDIO', 'AUDIO_ONLY');

-- CreateEnum
CREATE TYPE "AudioSampleRate" AS ENUM ('KHZ_44_1', 'KHZ_48');

-- CreateEnum
CREATE TYPE "VideoQuality" AS ENUM ('STANDARD', 'ADVANCED');

-- CreateTable
CREATE TABLE "Studio" (
    "id" TEXT NOT NULL,
    "studioName" TEXT NOT NULL,
    "enableLobby" BOOLEAN NOT NULL DEFAULT true,
    "enableCaptions" BOOLEAN NOT NULL DEFAULT false,
    "recordingType" "RecordingType" NOT NULL,
    "audioSampleRate" "AudioSampleRate" NOT NULL,
    "videoQuality" "VideoQuality" NOT NULL,
    "countdownBeforeRecording" BOOLEAN NOT NULL DEFAULT false,
    "autoStartOnGuestJoin" BOOLEAN NOT NULL DEFAULT false,
    "pauseUploads" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "studioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Studio_userId_key" ON "Studio"("userId");

-- CreateIndex
CREATE INDEX "Studio_id_userId_idx" ON "Studio"("id", "userId");

-- CreateIndex
CREATE INDEX "Project_id_studioId_idx" ON "Project"("id", "studioId");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Studio" ADD CONSTRAINT "Studio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
