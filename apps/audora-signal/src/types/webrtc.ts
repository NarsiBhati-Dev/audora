export type RTCSessionDescriptionInit = {
  type: "offer" | "answer";
  sdp: string;
};

export type RTCIceCandidateInit = {
  candidate: string;
  sdpMid?: string | null;
  sdpMLineIndex?: number | null;
};
