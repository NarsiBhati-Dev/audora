import { Message } from '@audora/types';
import {
  MeetingParticipant,
  useMeetingParticipantStore,
} from '@/store/meeting-participant-store';

import {
  createOffer,
  createAnswer,
  setRemoteDescription,
  addIceCandidate,
} from './peerConnections';
import { useSystemStreamStore } from '@/store/system-stream';

const onMessage = async (
  message: Message,
  sendMessage: (message: Message) => void,
  selfSocketId: string,
) => {
  const { type, data } = message;
  const stream = useSystemStreamStore.getState().stream;

  // Retry until local stream is available
  if (
    (type.startsWith('webrtc:') ||
      type === 'participants:list' ||
      type === 'user:joined') &&
    !stream
  ) {
    // console.warn(`[WebRTC] Stream not ready. Retrying type: ${type}`);
    setTimeout(() => onMessage(message, sendMessage, selfSocketId), 500);
    return;
  }

  switch (type) {
    case 'webrtc:offer': {
      const { sdp, from } = data;
      if (!sdp) return;
      // console.log('[WebRTC] Received offer from', from);

      await createAnswer(from, selfSocketId, sdp, stream!, sendMessage);
      break;
    }

    case 'webrtc:answer': {
      const { sdp, from } = data;
      if (!sdp) return;
      // console.log('[WebRTC] Received answer from', from);

      await setRemoteDescription(from, sdp);
      break;
    }

    case 'webrtc:ice-candidate': {
      const { candidate, from } = data;
      if (!candidate) return;

      await addIceCandidate(from, candidate);
      break;
    }

    case 'participants:list': {
      // console.log(
      //   '[WebRTC] Received participants list:',
      //   data.participants.length,
      // );

      for (const p of data.participants) {
        const user = p.user;
        if (user.socketId === selfSocketId) continue;

        const participant: MeetingParticipant = {
          id: user.userId,
          socketId: user.socketId,
          name: user.name,
          stream: null,
          isSpeaker: false,
          isMuted: false,
          isDeafened: false,
          isCameraOn: true,
          isMicOn: true,
        };

        useMeetingParticipantStore.getState().addParticipant(participant);

        // Add a small delay to prevent overwhelming the connection
        setTimeout(() => {
          createOffer(user.socketId, selfSocketId, stream!, sendMessage);
        }, Math.random() * 1000); // Random delay up to 1 second
      }
      break;
    }

    case 'user:joined': {
      const { user } = data;
      if (user.socketId === selfSocketId) break;

      // console.log('[WebRTC] User joined:', user.name);

      const newPeer: MeetingParticipant = {
        id: user.userId,
        socketId: user.socketId,
        name: user.name,
        stream: null,
        isSpeaker: false,
        isMuted: false,
        isDeafened: false,
        isCameraOn: true,
        isMicOn: true,
      };

      useMeetingParticipantStore.getState().addParticipant(newPeer);

      // Add a small delay to ensure the participant is added before creating offer
      setTimeout(() => {
        createOffer(user.socketId, selfSocketId, stream!, sendMessage);
      }, 100);
      break;
    }

    case 'user:left': {
      const { user } = data;
      // console.log('[WebRTC] User left:', user.name);
      useMeetingParticipantStore.getState().removeParticipant(user.socketId);
      break;
    }

    case 'meeting:end': {
      // console.log('[WebRTC] Meeting ended');
      useMeetingParticipantStore.getState().setParticipants([]);
      break;
    }

    case 'room:ready': {
      // console.log('[WebRTC] Room ready, self socket ID:', data.selfSocketId);
      useMeetingParticipantStore.getState().setSelfSocketId(data.selfSocketId);
      break;
    }

    default:
      // console.warn(`[WebRTC] Unknown message type: ${type}`);
      break;
  }
};

export default onMessage;
