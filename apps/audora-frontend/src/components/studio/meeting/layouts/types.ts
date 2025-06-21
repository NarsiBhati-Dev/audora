export interface MeetingParticipant {
  id: string;
  socketId: string;
  name: string;
  stream: MediaStream | null;
  isCameraOn: boolean;
  isMicOn: boolean;
}

export type DisplayParticipant = MeetingParticipant & {
  isSelf?: boolean;
};
