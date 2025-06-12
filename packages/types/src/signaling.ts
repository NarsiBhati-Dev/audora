import { z } from "zod";

// --- Participant structure ---
const Participant = z.object({
  userId: z.string(),
  name: z.string(),
  role: z.union([z.literal("host"), z.literal("guest")]),
  socketId: z.string(),
});

const ParticipantsListData = z.object({
  participants: z.array(Participant),
});

// --- Connection / Disconnection ---
const ConnectData = z.object({
  userId: z.string(),
  studioId: z.string(),
  name: z.string().optional(),
  role: z.union([z.literal("host"), z.literal("guest")]),
});

const DisconnectData = z.object({
  userId: z.string(),
  studioId: z.string(),
  role: z.union([z.literal("host"), z.literal("guest")]),
});

// --- WebRTC Types ---
const RTCSessionDescriptionInitSchema = z.object({
  type: z.union([z.literal("offer"), z.literal("answer")]),
  sdp: z.string(),
});

const RTCIceCandidateInitSchema = z.object({
  candidate: z.string(),
  sdpMid: z.string().nullable().optional(),
  sdpMLineIndex: z.number().nullable().optional(),
});

const WebRTCData = z.object({
  studioId: z.string(),
  to: z.string(),
  sdp: RTCSessionDescriptionInitSchema.optional(),
  candidate: RTCIceCandidateInitSchema.optional(),
});

// --- Recording & Speaking Events ---
const RecordingData = z.object({
  studioId: z.string(),
  userId: z.string(),
  timestamp: z.number(),
});

const SpeakingData = z.object({
  studioId: z.string(),
  userId: z.string(),
  timestamp: z.number(),
});

// --- Meeting End Event ---
const MeetingEndData = z.object({
  studioId: z.string(),
});

// --- Message Schema ---
export const MessageSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("user:join"), data: ConnectData }),
  z.object({ type: z.literal("user:leave"), data: DisconnectData }),
  z.object({ type: z.literal("webrtc:offer"), data: WebRTCData }),
  z.object({ type: z.literal("webrtc:answer"), data: WebRTCData }),
  z.object({ type: z.literal("webrtc:ice-candidate"), data: WebRTCData }),
  z.object({ type: z.literal("recording:start"), data: RecordingData }),
  z.object({ type: z.literal("recording:stop"), data: RecordingData }),
  z.object({ type: z.literal("user:start-speaking"), data: SpeakingData }),
  z.object({ type: z.literal("user:stop-speaking"), data: SpeakingData }),
  z.object({ type: z.literal("meeting:end"), data: MeetingEndData }),
  z.object({
    type: z.literal("participants:list"),
    data: ParticipantsListData,
  }),
]);

export type Message = z.infer<typeof MessageSchema>;
