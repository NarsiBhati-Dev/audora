import { create } from 'zustand';

interface Participant {
  id: string;
  name: string;
  stream: MediaStream | null;
  isMicOn: boolean;
  isCameraOn: boolean;
}

interface MeetingState {
  layout: 'grid' | 'speaker-full' | 'speaker-split';
  fitMode: 'fill' | 'fit';
  participants: Participant[];
  setLayout: (layout: 'grid' | 'speaker-full' | 'speaker-split') => void;
  setFitMode: (fitMode: 'fill' | 'fit') => void;
  addParticipant: (participant: Participant) => void;
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
}

export const useMeetingStore = create<MeetingState>(set => ({
  layout: 'grid',
  fitMode: 'fit',
  participants: [],
  setLayout: layout => set({ layout }),
  setFitMode: fitMode => set({ fitMode }),
  addParticipant: participant =>
    set(state => ({
      participants: [...state.participants, participant],
    })),
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
}));

interface MeetingParticipant {
  id: string;
  name: string;
  isSpeaker: boolean;
  isMuted: boolean;
  isDeafened: boolean;
  isCameraOn: boolean;
  isMicOn: boolean;
  isScreenShareOn: boolean;
  isScreenShareMuted: boolean;
  stream?: MediaStream | null;
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
}

export const useMeetingParticipantStore = create<MeetingParticipantStore>(
  set => ({
    participants: [
      // {
      //   id: '1',
      //   name: 'John Doe',
      //   isSpeaker: true,
      //   isMuted: false,
      //   isDeafened: false,
      //   isCameraOn: true,
      //   isMicOn: true,
      //   isScreenShareOn: false,
      //   isScreenShareMuted: false,
      // },
      // {
      //   id: '2',
      //   name: 'Jane Doe',
      //   isSpeaker: false,
      //   isMuted: false,
      //   isDeafened: false,
      //   isCameraOn: true,
      //   isMicOn: true,
      //   isScreenShareOn: false,
      //   isScreenShareMuted: false,
      // },
      // {
      //   id: '3',
      //   name: 'John Doe',
      //   isSpeaker: true,
      //   isMuted: false,
      //   isDeafened: false,
      //   isCameraOn: true,
      //   isMicOn: true,
      //   isScreenShareOn: false,
      //   isScreenShareMuted: false,
      // },
    ],
    setParticipants: participants => set({ participants }),
    addParticipant: participant =>
      set(state => ({ participants: [...state.participants, participant] })),
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
  }),
);
