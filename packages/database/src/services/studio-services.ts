import type {
  AudioSampleRate,
  VideoQuality,
  RecordingType,
  Studio,
} from "@prisma/client";

import { client } from "../index";
import generateStudioId from "../utils/generateStudioId";

export const createStudio = async ({
  userId,
  studioName,
  enableLobby = false,
  enableCaptions = false,
  recordingType = "VIDEO_AUDIO",
  audioSampleRate = "KHZ_44_1",
  videoQuality = "STANDARD",
  noiseReduction = false,
  language = "English",
  countdownBeforeRecording = false,
  autoStartOnGuestJoin = false,
  pauseUploads = false,
}: {
  userId: string;
  studioName: string;
  enableLobby?: boolean;
  enableCaptions?: boolean;
  recordingType: RecordingType;
  audioSampleRate: AudioSampleRate;
  videoQuality: VideoQuality;
  noiseReduction: boolean;
  language: string;
  countdownBeforeRecording?: boolean;
  autoStartOnGuestJoin?: boolean;
  pauseUploads?: boolean;
}) => {
  const studio = await client.studio.create({
    data: {
      id: generateStudioId(studioName),
      studioName,
      enableLobby,
      enableCaptions,
      recordingType,
      audioSampleRate,
      videoQuality,
      noiseReduction,
      countdownBeforeRecording,
      autoStartOnGuestJoin,
      pauseUploads,
      language,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return studio;
};

export const updateStudio = async (studioId: string, data: Partial<Studio>) => {
  const studio = await client.studio.update({
    where: { id: studioId },
    data,
  });

  return studio;
};

export const getStudioById = async (studioId: string) => {
  const studio = await client.studio.findUnique({
    where: { id: studioId },
  });

  return studio;
};

export const getStudioByUserId = async (userId: string) => {
  const studio = await client.studio.findUnique({
    where: { userId },
  });

  return studio;
};

export const deleteStudio = async (studioId: string) => {
  const studio = await client.studio.delete({
    where: { id: studioId },
  });

  return studio;
};
