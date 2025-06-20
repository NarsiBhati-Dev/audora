import { create } from 'zustand';

export interface MeetingParticipant {
  id: string; // userId
  socketId: string;
  name: string;
  stream: MediaStream | null;
  isSpeaker: boolean;
  isMuted: boolean;
  isDeafened: boolean;
  isCameraOn: boolean;
  isMicOn: boolean;
}

export interface MeetingParticipantStore {
  self: MeetingParticipant | null;
  participants: MeetingParticipant[];

  setSelf: (self: MeetingParticipant) => void;
  setSelfSocketId: (socketId: string) => void;
  updateSelfStatus: (isMicOn: boolean, isCameraOn: boolean) => void;
  updateSelfStream: (stream: MediaStream | null) => void;

  setParticipants: (
    participantsOrUpdater:
      | MeetingParticipant[]
      | ((participants: MeetingParticipant[]) => MeetingParticipant[]),
  ) => void;
  addParticipant: (participant: MeetingParticipant) => void;
  removeParticipant: (socketId: string) => void;
  updateParticipantStream: (
    socketId: string,
    stream: MediaStream | null,
  ) => void;
  updateParticipantStatus: (
    socketId: string,
    isMicOn: boolean,
    isCameraOn: boolean,
  ) => void;
  updateSpeakerStatus: (socketId: string, isSpeaker: boolean) => void;
}

export const useMeetingParticipantStore = create<MeetingParticipantStore>(
  set => ({
    self: null,
    participants: [],

    setSelf: self => set(() => ({ self })),

    updateSelfStatus: (isMicOn, isCameraOn) =>
      set(state => ({
        self: state.self ? { ...state.self, isMicOn, isCameraOn } : null,
      })),

    updateSelfStream: stream =>
      set(state => ({
        self: state.self ? { ...state.self, stream } : null,
      })),

    setSelfSocketId: (socketId: string) =>
      set(state => ({
        self: state.self ? { ...state.self, socketId } : null,
      })),

    setParticipants: participantsOrUpdater =>
      set(state => ({
        participants:
          typeof participantsOrUpdater === 'function'
            ? participantsOrUpdater(state.participants)
            : participantsOrUpdater,
      })),

    addParticipant: participant =>
      set(state => {
        const exists = state.participants.some(
          p => p.socketId === participant.socketId,
        );
        if (exists) return state;
        return { participants: [...state.participants, participant] };
      }),

    removeParticipant: socketId =>
      set(state => ({
        participants: state.participants.filter(p => p.socketId !== socketId),
      })),

    updateParticipantStream: (socketId, stream) =>
      set(state => ({
        participants: state.participants.map(p =>
          p.socketId === socketId ? { ...p, stream } : p,
        ),
      })),

    updateParticipantStatus: (socketId, isMicOn, isCameraOn) =>
      set(state => ({
        participants: state.participants.map(p =>
          p.socketId === socketId ? { ...p, isMicOn, isCameraOn } : p,
        ),
      })),

    updateSpeakerStatus: (socketId, isSpeaker) =>
      set(state => ({
        participants: state.participants.map(p =>
          p.socketId === socketId ? { ...p, isSpeaker } : p,
        ),
      })),
  }),
);
