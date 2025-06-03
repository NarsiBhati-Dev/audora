import type { RTCIceCandidateInit, RTCSessionDescriptionInit } from "./webrtc";

export type MessageType =
  | "user:connect"
  | "user:disconnect"
  | "webrtc:offer"
  | "webrtc:answer"
  | "webrtc:ice-candidate";

export interface Message {
  type: MessageType;
  data:
    | ConnectData
    | DisconnectData
    | OfferData
    | AnswerData
    | IceCandidateData;
}

// export interface OfferMessage {
//     type: "offer";
//     data: OfferData;
// }

// export interface AnswerMessage {
//     type: "answer";
//     data: AnswerData;
// }

// export interface IceCandidateMessage {
//     type: "ice-candidate";
//     data: IceCandidateData;
// }

// export interface DisconnectMessage {
//     type: "disconnect";
//     data: DisconnectData;
// }

export interface ConnectData {
  userId: string;
  roomId: string;
}

export interface OfferData {
  from: string;
  to: string;
  sdp: RTCSessionDescriptionInit;
}

export interface AnswerData {
  from: string;
  to: string;
  sdp: RTCSessionDescriptionInit;
}

export interface IceCandidateData {
  from: string;
  to: string;
  candidate: RTCIceCandidateInit;
}

export interface DisconnectData {
  userId: string;
}
