import { create } from 'zustand';

interface MeetingStore {
  layout: 'grid' | 'speaker-full' | 'speaker-split';
  fitMode: 'fill' | 'fit';
  setLayout: (layout: 'grid' | 'speaker-full' | 'speaker-split') => void;
  setFitMode: (fitMode: 'fill' | 'fit') => void;
}

export const useMeetingStore = create<MeetingStore>(set => ({
  layout: 'grid',
  fitMode: 'fit',
  setLayout: layout => set({ layout }),
  setFitMode: fitMode => set({ fitMode }),
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
}

export const useMeetingParticipantStore = create<MeetingParticipantStore>(
  set => ({
    participants: [
      {
        id: '1',
        name: 'John Doe',
        isSpeaker: true,
        isMuted: false,
        isDeafened: false,
        isCameraOn: true,
        isMicOn: true,
        isScreenShareOn: false,
        isScreenShareMuted: false,
      },
      {
        id: '2',
        name: 'Jane Doe',
        isSpeaker: false,
        isMuted: false,
        isDeafened: false,
        isCameraOn: true,
        isMicOn: true,
        isScreenShareOn: false,
        isScreenShareMuted: false,
      },
    ],
    setParticipants: participants => set({ participants }),
  }),
);
