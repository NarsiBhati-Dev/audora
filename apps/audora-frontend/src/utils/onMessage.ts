import { Message } from '@audora/types';
import {
  MeetingParticipant,
  useMeetingParticipantStore,
} from '@/store/webrtc/meeting-participant-store';

import {
  createOffer,
  createAnswer,
  setRemoteDescription,
  addIceCandidate,
} from './peerConnections';
import { useSystemStreamStore } from '@/store/webrtc/system-stream';

// Track pending connections that need to be retried
const pendingConnections = new Set<string>();
let retryTimeout: NodeJS.Timeout | null = null;

const retryPendingConnections = (
  sendMessage: (message: Message) => void,
  selfSocketId: string,
) => {
  const stream = useSystemStreamStore.getState().stream;
  if (!stream || pendingConnections.size === 0) return;

  const participants = useMeetingParticipantStore.getState().participants;

  for (const socketId of pendingConnections) {
    const participant = participants.find(p => p.socketId === socketId);
    if (participant) {
      // console.log(
      //   `[WebRTC] Retrying connection to ${participant.name} (${socketId})`,
      // );
      createOffer(socketId, selfSocketId, stream, sendMessage);
      pendingConnections.delete(socketId);
    }
  }

  // Schedule another retry if there are still pending connections
  if (pendingConnections.size > 0) {
    retryTimeout = setTimeout(
      () => retryPendingConnections(sendMessage, selfSocketId),
      1000,
    );
  }
};

const onMessage = async (
  message: Message,
  sendMessage: (message: Message) => void,
  selfSocketId: string,
  navigate: (url: string) => void,
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
    setTimeout(
      () => onMessage(message, sendMessage, selfSocketId, navigate),
      500,
    );
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
          isCameraOn: user.camOn,
          isMicOn: user.micOn,
        };

        useMeetingParticipantStore.getState().addParticipant(participant);

        // Try to connect immediately, but add to pending if it fails
        try {
          setTimeout(() => {
            // console.log(
            //   `[WebRTC] Creating offer for ${user.name} (${user.socketId})`,
            // );
            createOffer(user.socketId, selfSocketId, stream!, sendMessage);
          }, Math.random() * 500);
        } catch {
          // console.warn(
          //   `[WebRTC] Failed to create offer for ${user.name}, adding to pending`,
          // );
          pendingConnections.add(user.socketId);
        }
      }

      // Start retry mechanism for any pending connections
      if (pendingConnections.size > 0) {
        retryTimeout = setTimeout(
          () => retryPendingConnections(sendMessage, selfSocketId),
          1000,
        );
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
        isCameraOn: user.camOn,
        isMicOn: user.micOn,
      };

      useMeetingParticipantStore.getState().addParticipant(newPeer);

      // Try to connect immediately, but add to pending if it fails
      try {
        setTimeout(() => {
          // console.log(
          //   `[WebRTC] Creating offer for new user ${user.name} (${user.socketId})`,
          // );
          createOffer(user.socketId, selfSocketId, stream!, sendMessage);
        }, 100);
      } catch {
        // console.warn(
        //   `[WebRTC] Failed to create offer for new user ${user.name}, adding to pending`,
        // );
        pendingConnections.add(user.socketId);
        if (!retryTimeout) {
          retryTimeout = setTimeout(
            () => retryPendingConnections(sendMessage, selfSocketId),
            1000,
          );
        }
      }
      break;
    }

    case 'user:left': {
      const { user } = data;
      // console.log('[WebRTC] User left:', user.name);
      useMeetingParticipantStore.getState().removeParticipant(user.socketId);
      pendingConnections.delete(user.socketId);
      break;
    }

    case 'meeting:end': {
      // console.log('[WebRTC] Meeting ended');
      useMeetingParticipantStore.getState().setParticipants([]);
      pendingConnections.clear();
      if (retryTimeout) {
        clearTimeout(retryTimeout);
        retryTimeout = null;
      }
      navigate('/dashboard');
      break;
    }

    case 'room:ready': {
      // console.log('[WebRTC] Room ready, self socket ID:', data.selfSocketId);
      useMeetingParticipantStore.getState().setSelfSocketId(data.selfSocketId);
      useMeetingParticipantStore.getState().setSelfProjectId(data.projectId!);
      useMeetingParticipantStore.getState().setSelfTrackId(data.trackId!);

      // Try to establish connections with any existing participants
      const participants = useMeetingParticipantStore.getState().participants;
      if (participants.length > 0 && stream) {
        setTimeout(() => {
          for (const participant of participants) {
            if (participant.socketId !== data.selfSocketId) {
              try {
                // console.log(
                //   `[WebRTC] Creating offer for existing participant ${participant.name} (${participant.socketId})`,
                // );
                createOffer(
                  participant.socketId,
                  data.selfSocketId,
                  stream,
                  sendMessage,
                );
              } catch {
                // console.warn(
                //   `[WebRTC] Failed to create offer for existing participant ${participant.name}, adding to pending`,
                // );
                pendingConnections.add(participant.socketId);
              }
            }
          }

          if (pendingConnections.size > 0) {
            retryTimeout = setTimeout(
              () => retryPendingConnections(sendMessage, data.selfSocketId),
              1000,
            );
          }
        }, 500);
      }
      break;
    }

    case 'mic:toggle': {
      const { micOn, socketId } = data;
      useMeetingParticipantStore
        .getState()
        .updateParticipantStatus(
          socketId,
          micOn,
          useMeetingParticipantStore
            .getState()
            .participants.find(p => p.socketId === socketId)?.isCameraOn ??
            false,
        );
      break;
    }

    case 'cam:toggle': {
      const { camOn, socketId } = data;
      useMeetingParticipantStore
        .getState()
        .updateParticipantStatus(
          socketId,
          useMeetingParticipantStore
            .getState()
            .participants.find(p => p.socketId === socketId)?.isMicOn ?? false,
          camOn,
        );
      break;
    }

    default:
      // console.warn(`[WebRTC] Unknown message type: ${type}`);
      break;
  }
};

export default onMessage;
