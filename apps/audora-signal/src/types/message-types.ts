import type { RTCIceCandidateInit, RTCSessionDescriptionInit } from "./webrtc";

// Inbound = Client ➜ Server
export type InboundMessage =
  | { type: "user:join"; data: { name: string } }
  | { type: "user:leave"; data: {} }
  | { type: "webrtc:offer"; data: WebRTCData }
  | { type: "webrtc:answer"; data: WebRTCData }
  | { type: "webrtc:ice-candidate"; data: WebRTCData }
  | { type: "recording:start"; data: RecordingData }
  | { type: "recording:stop"; data: RecordingData }
  | { type: "user:start-speaking"; data: SpeakingData }
  | { type: "user:stop-speaking"; data: SpeakingData }
  | { type: "meeting:end"; data: MeetingEndData };

// Outbound = Server ➜ Clients
export type OutboundMessage =
  | { type: "user:joined"; data: ParticipantInfo }
  | { type: "user:left"; data: { userId: string } }
  | { type: "participants:list"; data: { participants: ParticipantInfo[] } }
  | { type: "webrtc:offer"; data: WebRTCData }
  | { type: "webrtc:answer"; data: WebRTCData }
  | { type: "webrtc:ice-candidate"; data: WebRTCData };

export interface ParticipantInfo {
  userId: string;
  name: string;
  participantRole: "host" | "guest";
  studioId: string;
  roomId: string;
  participantId: string;
}

export interface ConnectData {
  name: string;
}

export interface UserJoinedData {
  userId: string;
  name: string;
  participantRole: "host" | "guest";
  studioId: string;
  roomId: string;
  participantId: string;
}

export interface UserLeftData {
  userId: string;
}

export interface StudioFullData {}
export interface StudioFullData {}
export interface DisconnectData {}
export interface MeetingEndData {}

export interface WebRTCData {
  to: string;
  from: string;
  sdp?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
}

export interface RecordingData {
  timestamp: number;
}

export interface SpeakingData {
  timestamp: number;
}
