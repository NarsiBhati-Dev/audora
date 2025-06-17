import { Message } from '@audora/types';
import { useSystemStreamStore } from '@/store/system-stream';
import { MeetingParticipant, useOneToOneStore } from '@/store/one-to-one-store';
import { peerConnections, createPeer } from './peerConnections';

const onMessage = async (
  message: Message,
  sendMessage: (message: Message) => void,
  selfSocketId: string,
) => {
  const { type, data } = message;
  const stream = useSystemStreamStore.getState().stream;

  // Wait for local stream to be ready
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

      const alreadyExists = peerConnections.has(from);
      const peer = alreadyExists
        ? peerConnections.get(from)!.peer
        : createPeer(from, selfSocketId, stream!, sendMessage, false);

      const state = peerConnections.get(from);
      if (!state) return;

      await peer.setRemoteDescription(new RTCSessionDescription(sdp));
      state.remoteDescriptionSet = true;

      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      sendMessage({
        type: 'webrtc:answer',
        data: {
          sdp: {
            type: answer.type as 'answer',
            sdp: answer.sdp!,
          },
          from: selfSocketId,
          to: from,
        },
      });

      for (const c of state.pendingCandidates) {
        await peer.addIceCandidate(new RTCIceCandidate(c));
      }
      state.pendingCandidates = [];
      break;
    }

    case 'webrtc:answer': {
      const { sdp, to } = data;
      const state = peerConnections.get(to);
      if (!state || !sdp) return;

      if (!state.peer.remoteDescription) {
        await state.peer.setRemoteDescription(new RTCSessionDescription(sdp));
        state.remoteDescriptionSet = true;

        for (const c of state.pendingCandidates) {
          await state.peer.addIceCandidate(new RTCIceCandidate(c));
        }
        state.pendingCandidates = [];
      } else {
        console.warn('[WebRTC] Remote description already set for answer');
      }

      break;
    }

    case 'webrtc:ice-candidate': {
      const { candidate, to } = data;
      const state = peerConnections.get(to);
      if (!state || !candidate) return;

      if (state.remoteDescriptionSet) {
        try {
          await state.peer.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error('[WebRTC] ICE error:', err);
        }
      } else {
        state.pendingCandidates.push(candidate);
      }
      break;
    }

    case 'participants:list': {
      const [peerUser] = data.participants.map(p => ({
        id: p.user.userId,
        socketId: p.user.socketId,
        name: p.user.name,
        stream: null,
        isSpeaker: false,
        isMuted: false,
        isDeafened: false,
        isCameraOn: true,
        isMicOn: true,
        isScreenShareOn: false,
        isScreenShareMuted: false,
      }));

      useOneToOneStore.getState().setPeer(peerUser as MeetingParticipant);

      if (
        peerUser?.socketId !== selfSocketId &&
        !peerConnections.has(peerUser?.socketId || '')
      ) {
        createPeer(
          peerUser?.socketId || '',
          selfSocketId,
          stream!,
          sendMessage,
          true,
        );
        // `onnegotiationneeded` will handle offer
      }

      break;
    }

    case 'user:joined': {
      const { user } = data;
      const newPeer = {
        id: user.userId,
        socketId: user.socketId,
        name: user.name,
        stream: null,
        isSpeaker: false,
        isMuted: false,
        isDeafened: false,
        isCameraOn: true,
        isMicOn: true,
        isScreenShareOn: false,
        isScreenShareMuted: false,
      };

      useOneToOneStore.getState().setPeer(newPeer);

      if (
        user.socketId !== selfSocketId &&
        !peerConnections.has(user.socketId)
      ) {
        createPeer(user.socketId, selfSocketId, stream!, sendMessage, true);
        // `onnegotiationneeded` will handle offer
      }

      break;
    }

    case 'user:left': {
      const { user } = data;
      useOneToOneStore.getState().updatePeer({ stream: null });

      const state = peerConnections.get(user.socketId);
      if (state) {
        state.peer.close();
        peerConnections.delete(user.socketId);
      }

      break;
    }

    case 'meeting:end': {
      useOneToOneStore.getState().updatePeer({ stream: null });
      useOneToOneStore.getState().updateSelf({ stream: null });

      peerConnections.forEach(state => state.peer.close());
      peerConnections.clear();

      break;
    }

    default:
      console.warn(`[WebRTC] Unknown message type: ${type}`);
  }
};

export default onMessage;
