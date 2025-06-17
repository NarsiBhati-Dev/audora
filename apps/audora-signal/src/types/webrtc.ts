export interface RTCSessionDescriptionInit {
  type: "offer" | "answer";
  sdp: string;
}

export interface RTCIceCandidateInit {
  candidate: string;
  sdpMid?: string;
  sdpMLineIndex?: number;
}
