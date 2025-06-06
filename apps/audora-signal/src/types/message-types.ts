import type { RTCIceCandidateInit, RTCSessionDescriptionInit } from "./webrtc";

export type Message =
  | { type: "user:join"; data: ConnectData }
  | { type: "user:leave"; data: DisconnectData }
  | { type: "webrtc:offer"; data: WebRTCData }
  | { type: "webrtc:answer"; data: WebRTCData }
  | { type: "webrtc:ice-candidate"; data: WebRTCData }
  | { type: "recording:start"; data: RecordingData }
  | { type: "recording:stop"; data: RecordingData }
  | { type: "user:start-speaking"; data: SpeakingData }
  | { type: "user:stop-speaking"; data: SpeakingData }
  | { type: "meeting:end"; data: MeetingEndData };

export interface ConnectData {
  userId: string;
  studioId: string;
  name?: string;
  role: "host" | "guest";
}

export interface DisconnectData {
  userId: string;
  studioId: string;
  role: "host" | "guest";
}

export interface WebRTCData {
  studioId: string;
  to: string;
  sdp?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
}

export interface RecordingData {
  studioId: string;
  userId: string;
  timestamp: number;
}

export interface SpeakingData {
  studioId: string;
  userId: string;
  timestamp: number;
}

export interface MeetingEndData {
  studioId: string;
}
