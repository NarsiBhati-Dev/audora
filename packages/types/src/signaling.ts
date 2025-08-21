import { z } from "zod";

// ─────────────────────────────────────────
// Core: Shared Participant + RTC Types
// ─────────────────────────────────────────

export const ParticipantRoleSchema = z.union([
  z.literal("host"),
  z.literal("guest"),
]);

export type ParticipantRole = z.infer<typeof ParticipantRoleSchema>;

export const ParticipantSchema = z.object({
  userId: z.string(),
  name: z.string(),
  role: ParticipantRoleSchema,
  socketId: z.string(),
});

export type Participant = z.infer<typeof ParticipantSchema>;

export const RTCSessionDescriptionInitSchema = z.object({
  type: z.union([z.literal("offer"), z.literal("answer")]),
  sdp: z.string(),
});

export const RTCIceCandidateInitSchema = z.object({
  candidate: z.string().optional(),
  sdpMid: z.string().optional().nullable(),
  sdpMLineIndex: z.number().optional().nullable(),
});

export type RTCSessionDescriptionInit = z.infer<
  typeof RTCSessionDescriptionInitSchema
>;

export type RTCIceCandidateInit = z.infer<typeof RTCIceCandidateInitSchema>;

export const WebRTCDataSchema = z.object({
  to: z.string(),
  from: z.string(),
  sdp: RTCSessionDescriptionInitSchema.optional(),
  candidate: RTCIceCandidateInitSchema.optional(),
});

export type WebRTCData = z.infer<typeof WebRTCDataSchema>;

// ─────────────────────────────────────────
// InboundMessage (Client ➜ Server)
// ─────────────────────────────────────────

export const InboundMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("user:join"),
    data: z.object({
      name: z.string(),
      micOn: z.boolean(),
      camOn: z.boolean(),
    }),
  }),
  z.object({
    type: z.literal("user:leave"),
    data: z.object({ userId: z.string() }),
  }),
  z.object({ type: z.literal("webrtc:offer"), data: WebRTCDataSchema }),
  z.object({ type: z.literal("webrtc:answer"), data: WebRTCDataSchema }),
  z.object({ type: z.literal("webrtc:ice-candidate"), data: WebRTCDataSchema }),
  z.object({
    type: z.literal("recording:start"),
    data: z.object({ recordingStatus: z.boolean(), projectId: z.string() }),
  }),
  z.object({
    type: z.literal("recording:stop"),
    data: z.object({ recordingStatus: z.boolean(), trackId: z.string() }),
  }),
  z.object({
    type: z.literal("project-id"),
    data: z.object({ projectId: z.string() }),
  }),
  z.object({
    type: z.literal("track-id"),
    data: z.object({ trackId: z.string() }),
  }),
  z.object({
    type: z.literal("user:start-speaking"),
    data: z.object({ timestamp: z.number() }),
  }),
  z.object({
    type: z.literal("user:stop-speaking"),
    data: z.object({ timestamp: z.number() }),
  }),
  z.object({
    type: z.literal("mic:toggle"),
    data: z.object({ micOn: z.boolean(), socketId: z.string() }),
  }),
  z.object({
    type: z.literal("cam:toggle"),
    data: z.object({ camOn: z.boolean(), socketId: z.string() }),
  }),
  z.object({
    type: z.literal("meeting:end"),
    data: z.object({ socketId: z.string() }),
  }),
]);

export type InboundMessage = z.infer<typeof InboundMessageSchema>;

// ─────────────────────────────────────────
// OutboundMessage (Server ➜ Client)
// ─────────────────────────────────────────

const UserSchema = z.object({
  userId: z.string(),
  name: z.string(),
  role: ParticipantRoleSchema,
  socketId: z.string(),
  micOn: z.boolean(),
  camOn: z.boolean(),
  projectId: z.string().optional(),
  trackId: z.string().optional(),
});

export const OutboundMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("user:joined"),
    data: z.object({ user: UserSchema }),
  }),
  z.object({
    type: z.literal("user:left"),
    data: z.object({ user: UserSchema }),
  }),
  z.object({
    type: z.literal("participants:list"),
    data: z.object({
      participants: z.array(z.object({ user: UserSchema })),
    }),
  }),
  z.object({
    type: z.literal("room:ready"),
    data: z.object({
      selfSocketId: z.string(),
      projectId: z.string().optional(),
      trackId: z.string().optional(),
    }),
  }),
  z.object({ type: z.literal("webrtc:offer"), data: WebRTCDataSchema }),
  z.object({ type: z.literal("webrtc:answer"), data: WebRTCDataSchema }),
  z.object({ type: z.literal("webrtc:ice-candidate"), data: WebRTCDataSchema }),
  z.object({
    type: z.literal("mic:toggle"),
    data: z.object({ micOn: z.boolean(), socketId: z.string() }),
  }),
  z.object({
    type: z.literal("cam:toggle"),
    data: z.object({ camOn: z.boolean(), socketId: z.string() }),
  }),
  z.object({
    type: z.literal("meeting:end"),
    data: z.object({ socketId: z.string() }),
  }),
]);

export type OutboundMessage = z.infer<typeof OutboundMessageSchema>;

// ─────────────────────────────────────────
// Utility Exports
// ─────────────────────────────────────────

export type Message = InboundMessage | OutboundMessage;
