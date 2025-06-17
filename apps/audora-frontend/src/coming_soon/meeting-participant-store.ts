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

// interface MeetingParticipantStore {
//   participants: MeetingParticipant[];
//   setParticipants: (
//     participants:
//       | MeetingParticipant[]
//       | ((prev: MeetingParticipant[]) => MeetingParticipant[]),
//   ) => void;
//   addParticipant: (participant: MeetingParticipant) => void;
//   removeParticipant: (socketId: string) => void;
//   updateParticipantStream: (
//     socketId: string,
//     stream: MediaStream | null,
//   ) => void;
//   updateParticipantStatus: (
//     socketId: string,
//     isMicOn: boolean,
//     isCameraOn: boolean,
//   ) => void;
//   updateScreenShareStatus: (
//     socketId: string,
//     isScreenShareOn: boolean,
//     isScreenShareMuted: boolean,
//   ) => void;
//   updateSpeakerStatus: (socketId: string, isSpeaker: boolean) => void;
// }

// export const useMeetingParticipantStore = create<MeetingParticipantStore>(
//   set => ({
//     participants: [],
//     setParticipants: participantsOrUpdater =>
//       set(state => ({
//         participants:
//           typeof participantsOrUpdater === 'function'
//             ? participantsOrUpdater(state.participants)
//             : participantsOrUpdater,
//       })),
//     addParticipant: participant =>
//       set(state => {
//         const exists = state.participants.some(
//           p => p.socketId === participant.socketId,
//         );
//         if (exists) return state;
//         return { participants: [...state.participants, participant] };
//       }),
//     removeParticipant: socketId =>
//       set(state => ({
//         participants: state.participants.filter(p => p.socketId !== socketId),
//       })),
//     updateParticipantStream: (socketId, stream) =>
//       set(state => ({
//         participants: state.participants.map(p =>
//           p.socketId === socketId ? { ...p, stream } : p,
//         ),
//       })),
//     updateParticipantStatus: (socketId, isMicOn, isCameraOn) =>
//       set(state => ({
//         participants: state.participants.map(p =>
//           p.socketId === socketId ? { ...p, isMicOn, isCameraOn } : p,
//         ),
//       })),
//     updateScreenShareStatus: (socketId, isScreenShareOn, isScreenShareMuted) =>
//       set(state => ({
//         participants: state.participants.map(p =>
//           p.socketId === socketId
//             ? { ...p, isScreenShareOn, isScreenShareMuted }
//             : p,
//         ),
//       })),
//     updateSpeakerStatus: (socketId, isSpeaker) =>
//       set(state => ({
//         participants: state.participants.map(p =>
//           p.socketId === socketId ? { ...p, isSpeaker } : p,
//         ),
//       })),
//   }),
// );
