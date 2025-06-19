import { Message } from '@audora/types';
import { useMeetingParticipantStore } from '@/store/meeting-participant-store';

export const peerConfiguration: RTCConfiguration = {
  iceServers: [
    { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] },
  ],
};

type PeerState = {
  peer: RTCPeerConnection;
};

const peerConnections = new Map<string, PeerState>();

// ─────────────────────────────────────────
// Getters & Cleaners
// ─────────────────────────────────────────

export const getPeer = (socketId: string): RTCPeerConnection | null => {
  return peerConnections.get(socketId)?.peer || null;
};

export const removePeer = (socketId: string) => {
  const state = peerConnections.get(socketId);
  if (state) {
    state.peer.close();
    peerConnections.delete(socketId);
    console.log(`[WebRTC] Closed connection with ${socketId}`);
  }
};

export const clearAllPeers = () => {
  peerConnections.forEach(({ peer }, socketId) => {
    peer.close();
    console.log(`[WebRTC] Closed connection with ${socketId}`);
  });
  peerConnections.clear();
};

// ─────────────────────────────────────────
// WebRTC Offer
// ─────────────────────────────────────────

export const createOffer = async (
  socketId: string,
  selfSocketId: string,
  stream: MediaStream,
  sendMessage: (message: Message) => void,
) => {
  const peer = new RTCPeerConnection(peerConfiguration);

  // Attach local tracks
  stream.getTracks().forEach(track => peer.addTrack(track, stream));

  // Handle remote track
  peer.ontrack = event => {
    const remoteStream = event.streams[0];
    useMeetingParticipantStore
      .getState()
      .updateParticipantStream(socketId, remoteStream || null);
  };

  // Handle ICE candidates
  peer.onicecandidate = event => {
    if (event.candidate) {
      sendMessage({
        type: 'webrtc:ice-candidate',
        data: {
          from: selfSocketId,
          to: socketId,
          candidate: event.candidate.toJSON(),
        },
      });
    }
  };

  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);

  sendMessage({
    type: 'webrtc:offer',
    data: {
      sdp: {
        type: offer.type as 'offer',
        sdp: offer.sdp!,
      },
      from: selfSocketId,
      to: socketId,
    },
  });

  peerConnections.set(socketId, { peer });
};

// ─────────────────────────────────────────
// WebRTC Answer
// ─────────────────────────────────────────

export const createAnswer = async (
  socketId: string,
  selfSocketId: string,
  sdp: RTCSessionDescriptionInit,
  stream: MediaStream,
  sendMessage: (message: Message) => void,
) => {
  const peer = new RTCPeerConnection(peerConfiguration);

  stream.getTracks().forEach(track => peer.addTrack(track, stream));

  peer.ontrack = event => {
    const remoteStream = event.streams[0];
    useMeetingParticipantStore
      .getState()
      .updateParticipantStream(socketId, remoteStream || null);
  };

  peer.onicecandidate = event => {
    if (event.candidate) {
      sendMessage({
        type: 'webrtc:ice-candidate',
        data: {
          from: selfSocketId,
          to: socketId,
          candidate: event.candidate.toJSON(),
        },
      });
    }
  };

  await peer.setRemoteDescription(new RTCSessionDescription(sdp));
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
      to: socketId,
    },
  });

  peerConnections.set(socketId, { peer });
};

// ─────────────────────────────────────────
// Add ICE Candidate (called on ice-candidate message)
// ─────────────────────────────────────────

export const addIceCandidate = async (
  socketId: string,
  candidate: RTCIceCandidateInit,
) => {
  const peer = getPeer(socketId);
  if (!peer) {
    console.warn(
      `[WebRTC] Cannot add ICE candidate, peer not found: ${socketId}`,
    );
    return;
  }

  try {
    await peer.addIceCandidate(new RTCIceCandidate(candidate));
  } catch (err) {
    console.error(`[WebRTC] Failed to add ICE candidate for ${socketId}`, err);
  }
};
