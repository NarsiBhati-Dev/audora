import { Message } from '@audora/types';
import {
  MeetingParticipant,
  useMeetingParticipantStore,
} from '@/store/meeting-participant-store';

import { createOffer, createAnswer, getPeer } from './peerConnections';
import { useSystemStreamStore } from '@/store/system-stream';

const onMessage = async (
  message: Message,
  sendMessage: (message: Message) => void,
  selfSocketId: string,
) => {
  const { type, data } = message;
  // const stream = useMeetingParticipantStore.getState().self?.stream;
  const stream = useSystemStreamStore.getState().stream;

  // Retry until local stream is available
  if (
    (type.startsWith('webrtc:') ||
      type === 'participants:list' ||
      type === 'user:joined') &&
    !stream
  ) {
    console.warn(`[WebRTC] Stream not ready. Retrying type: ${type}`);
    setTimeout(() => onMessage(message, sendMessage, selfSocketId), 500);
    return;
  }

  switch (type) {
    case 'webrtc:offer': {
      const { sdp, from } = data;
      if (!sdp) return;
      console.log('[WebRTC] Received offer from', from);

      await createAnswer(from, selfSocketId, sdp, stream!, sendMessage);
      break;
    }

    case 'webrtc:answer': {
      const { sdp, from } = data;
      if (!sdp) return;
      console.log('[WebRTC] Received answer from', from);

      const peer = getPeer(from);
      if (!peer) {
        console.warn(`[WebRTC] No peer found for ${from}`);
        return;
      }

      await peer.setRemoteDescription(new RTCSessionDescription(sdp));
      break;
    }

    case 'webrtc:ice-candidate': {
      const { candidate, from } = data;
      if (!candidate) return;

      const peer = getPeer(from);
      if (!peer) {
        console.warn(`[WebRTC] No peer found for ${from}`);
        return;
      }

      try {
        await peer.addIceCandidate(new RTCIceCandidate(candidate));
        console.log('[WebRTC] Added ICE candidate from', from);
      } catch (err) {
        console.error('[WebRTC] Error adding ICE candidate:', err);
      }

      break;
    }

    case 'participants:list': {
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
        await createOffer(user.socketId, selfSocketId, stream!, sendMessage);
      }
      break;
    }

    case 'user:joined': {
      const { user } = data;
      if (user.socketId === selfSocketId) break;

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
      await createOffer(user.socketId, selfSocketId, stream!, sendMessage);
      break;
    }

    case 'user:left': {
      const { user } = data;
      useMeetingParticipantStore.getState().removeParticipant(user.socketId);
      break;
    }

    case 'meeting:end': {
      useMeetingParticipantStore.getState().setParticipants([]);
      break;
    }

    case 'room:ready': {
      useMeetingParticipantStore.getState().setSelfSocketId(data.selfSocketId);
      break;
    }

    default:
      console.warn(`[WebRTC] Unknown message type: ${type}`);
  }
};

export default onMessage;
