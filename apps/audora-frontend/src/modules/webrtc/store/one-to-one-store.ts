// import { create } from 'zustand';

// export interface MeetingParticipant {
//   id: string; // userId
//   socketId: string;
//   name: string;
//   stream: MediaStream | null;
//   isSpeaker: boolean;
//   isMuted: boolean;
//   isDeafened: boolean;
//   isCameraOn: boolean;
//   isMicOn: boolean;
//   isScreenShareOn: boolean;
//   isScreenShareMuted: boolean;
// }

// interface OneToOneStore {
//   self: MeetingParticipant | null;
//   peer: MeetingParticipant | null;
//   setSelf: (user: MeetingParticipant) => void;
//   setPeer: (user: MeetingParticipant) => void;
//   updateSelf: (updates: Partial<MeetingParticipant>) => void;
//   updatePeer: (updates: Partial<MeetingParticipant>) => void;
//   reset: () => void;
// }

// export const useOneToOneStore = create<OneToOneStore>(set => ({
//   self: null,
//   peer: null,

//   setSelf: user => set({ self: user }),
//   setPeer: user => set({ peer: user }),

//   updateSelf: updates =>
//     set(state =>
//       state.self ? { self: { ...state.self, ...updates } } : state,
//     ),

//   updatePeer: updates =>
//     set(state =>
//       state.peer ? { peer: { ...state.peer, ...updates } } : state,
//     ),

//   reset: () => set({ self: null, peer: null }),
// }));
