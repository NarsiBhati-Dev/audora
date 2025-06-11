import { z } from "zod";

export const LanguageSchema = z.enum([
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Korean",
  "Arabic",
  "Turkish",
  "Portuguese",
  "Dutch",
  "Polish",
  "Romanian",
  "Chinese",
  "Russian",
]);

export const StudioSchema = z.object({
  id: z.string(),
  studioSlug: z.string(),
  studioName: z.string(),
  userId: z.string(),
  recordingType: z.enum(["VIDEO_AUDIO", "AUDIO"]),
  audioSampleRate: z.enum(["KHZ_44_1", "KHZ_48_0"]),
  videoQuality: z.enum(["STANDARD", "HIGH"]),
  language: LanguageSchema,
  noiseReduction: z.boolean(),
  countdownBeforeRecording: z.boolean(),
  enableLobby: z.boolean(),
  enableCaptions: z.boolean(),
  autoStartOnGuestJoin: z.boolean(),
  pauseUploads: z.boolean(),
});

export const CreateStudioSchema = StudioSchema.omit({
  id: true,
  userId: true,
});

export const DeleteStudioSchema = z.object({
  id: z.string(),
});

export const UpdateStudioSchema = StudioSchema.omit({
  studioSlug: true,
  userId: true,
});

export const UpdateStudioSettingSchema = z.object({
  settingName: z.enum([
    "countdownBeforeRecording",
    "enableLobby",
    "language",
    "enableCaptions",
    "autoStartOnGuestJoin",
    "noiseReduction",
    "pauseUploads",
    "audioSampleRate",
    "videoQuality",
    "recordingType",
  ]),
  settingValue: StudioSchema.pick({
    countdownBeforeRecording: true,
    recordingType: true,
    audioSampleRate: true,
    videoQuality: true,
    enableLobby: true,
    language: true,
    noiseReduction: true,
    enableCaptions: true,
    autoStartOnGuestJoin: true,
    pauseUploads: true,
  }),
});

export const GetStudioSchema = z.object({
  id: z.string(),
});

export type Studio = z.infer<typeof StudioSchema>;
export type CreateStudio = z.infer<typeof CreateStudioSchema>;
export type UpdateStudio = z.infer<typeof UpdateStudioSchema>;
export type GetStudio = z.infer<typeof GetStudioSchema>;
export type UpdateStudioSetting = z.infer<typeof UpdateStudioSettingSchema>;
