export type Participant = {
  userId: string;
  socketId: string;
  name: string;
  participantRole: "host" | "guest" | "producer";
  joinedAt: number;
  isUsingHeadphones?: boolean;
  isConnected: boolean;
};

export type RoomState = {
  roomId: string;
  hostId: string;
  participants: Map<string, Participant>;
  isLive: boolean;
  createdAt: number;
  recordingStartedAt?: number;
  endedAt?: number;
};
