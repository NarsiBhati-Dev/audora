import { create } from 'zustand';

export interface MeetingParticipant {
  id: string;
  name: string;
  stream: MediaStream | null;
  isSpeaker: boolean;
  isMuted: boolean;
  isDeafened: boolean;
  isCameraOn: boolean;
  isMicOn: boolean;
  isScreenShareOn: boolean;
  isScreenShareMuted: boolean;
}

interface MeetingParticipantStore {
  participants: MeetingParticipant[];
  setParticipants: (participants: MeetingParticipant[]) => void;
  addParticipant: (participant: MeetingParticipant) => void;
  removeParticipant: (participantId: string) => void;
  updateParticipantStream: (
    participantId: string,
    stream: MediaStream | null,
  ) => void;
  updateParticipantStatus: (
    participantId: string,
    isMicOn: boolean,
    isCameraOn: boolean,
  ) => void;
  updateScreenShareStatus: (
    participantId: string,
    isScreenShareOn: boolean,
    isScreenShareMuted: boolean,
  ) => void;
  updateSpeakerStatus: (participantId: string, isSpeaker: boolean) => void;
}

export const useMeetingParticipantStore = create<MeetingParticipantStore>(
  set => ({
    participants: [],
    setParticipants: participants => set({ participants }),
    addParticipant: participant =>
      set(state => {
        const exists = state.participants.some(p => p.id === participant.id);
        if (exists) return state;
        return { participants: [...state.participants, participant] };
      }),
    removeParticipant: participantId =>
      set(state => ({
        participants: state.participants.filter(p => p.id !== participantId),
      })),
    updateParticipantStream: (participantId, stream) =>
      set(state => ({
        participants: state.participants.map(p =>
          p.id === participantId ? { ...p, stream } : p,
        ),
      })),
    updateParticipantStatus: (participantId, isMicOn, isCameraOn) =>
      set(state => ({
        participants: state.participants.map(p =>
          p.id === participantId ? { ...p, isMicOn, isCameraOn } : p,
        ),
      })),
    updateScreenShareStatus: (
      participantId,
      isScreenShareOn,
      isScreenShareMuted,
    ) =>
      set(state => ({
        participants: state.participants.map(p =>
          p.id === participantId
            ? { ...p, isScreenShareOn, isScreenShareMuted }
            : p,
        ),
      })),
    updateSpeakerStatus: (participantId, isSpeaker) =>
      set(state => ({
        participants: state.participants.map(p =>
          p.id === participantId ? { ...p, isSpeaker } : p,
        ),
      })),
  }),
);
