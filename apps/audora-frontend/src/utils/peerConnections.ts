// @audora/webrtc

import { Message } from '@audora/types';
import { useMeetingParticipantStore } from '@/store/webrtc/meeting-participant-store';

export const peerConfiguration: RTCConfiguration = {
  iceServers: [
    { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] },
  ],
  iceCandidatePoolSize: 10,
};

type PeerState = {
  peer: RTCPeerConnection;
  iceCandidates: RTCIceCandidateInit[];
  isRemoteDescriptionSet: boolean;
  retryCount: number;
  lastRetryTime: number;
};

const peerConnections = new Map<string, PeerState>();
const retryTimers = new Map<string, NodeJS.Timeout>();
const connectionHealthChecks = new Map<string, NodeJS.Timeout>();

const MAX_RETRY_COUNT = 3;
const RETRY_DELAY = 2000; // ms

/* -------------------------------------------------------------------------- */
/*                             Utility functions                              */
/* -------------------------------------------------------------------------- */

export const getPeerState = (socketId: string): PeerState | null =>
  peerConnections.get(socketId) ?? null;

export const getPeer = (socketId: string): RTCPeerConnection | null =>
  getPeerState(socketId)?.peer ?? null;

const canRetry = (socketId: string) => {
  const state = getPeerState(socketId);
  if (!state) return false;
  return (
    state.retryCount < MAX_RETRY_COUNT &&
    Date.now() - state.lastRetryTime > RETRY_DELAY
  );
};

const incrementRetryCount = (socketId: string) => {
  const state = getPeerState(socketId);
  if (state) {
    state.retryCount += 1;
    state.lastRetryTime = Date.now();
  }
};

/* -------------------------------------------------------------------------- */
/*                            Peer cleanup helpers                            */
/* -------------------------------------------------------------------------- */

export const removePeer = (socketId: string) => {
  const state = peerConnections.get(socketId);
  if (state) {
    state.peer.getSenders().forEach(s => s.track?.stop());
    state.peer.close();
    peerConnections.delete(socketId);
  }
  const t = retryTimers.get(socketId);
  if (t) {
    clearTimeout(t);
    retryTimers.delete(socketId);
  }
  stopHealthCheck(socketId);
};

export const clearAllPeers = () => {
  [...peerConnections.keys()].forEach(removePeer);
};

/* -------------------------------------------------------------------------- */
/*                              ICE management                                */
/* -------------------------------------------------------------------------- */

const addIceCandidateSafely = async (
  socketId: string,
  candidate: RTCIceCandidateInit,
) => {
  const state = getPeerState(socketId);
  if (!state) return;

  if (!state.isRemoteDescriptionSet) {
    state.iceCandidates.push(candidate);
    return;
  }
  try {
    await state.peer.addIceCandidate(new RTCIceCandidate(candidate));
  } catch {
    /* swallow */
  }
};

const flushIceCandidates = async (socketId: string) => {
  const state = getPeerState(socketId);
  if (!state?.iceCandidates.length) return;

  for (const c of state.iceCandidates) {
    try {
      await state.peer.addIceCandidate(new RTCIceCandidate(c));
    } catch {
      /* swallow */
    }
  }
  state.iceCandidates = [];
};

/* -------------------------------------------------------------------------- */
/*                          Connection-health timer                           */
/* -------------------------------------------------------------------------- */

const startHealthCheck = (socketId: string) => {
  stopHealthCheck(socketId);
  const t = setInterval(() => {
    const st = getPeerState(socketId);
    if (!st) return stopHealthCheck(socketId);

    const cs = st.peer.connectionState;
    if ((cs === 'failed' || cs === 'disconnected') && canRetry(socketId)) {
      incrementRetryCount(socketId);
      scheduleRetryOffer(socketId);
    }
  }, 10_000);
  connectionHealthChecks.set(socketId, t);
};

const stopHealthCheck = (socketId: string) => {
  const t = connectionHealthChecks.get(socketId);
  if (t) clearInterval(t);
  connectionHealthChecks.delete(socketId);
};

/* -------------------------------------------------------------------------- */
/*                              Retry handling                                */
/* -------------------------------------------------------------------------- */

const scheduleRetryOffer = (
  socketId: string,
  selfSocketId?: string,
  stream?: MediaStream,
  sendMessage?: (m: Message) => void,
) => {
  if (!canRetry(socketId) || retryTimers.has(socketId)) return;
  const t = setTimeout(() => {
    retryTimers.delete(socketId);
    if (selfSocketId && stream && sendMessage) {
      createOffer(socketId, selfSocketId, stream, sendMessage, true);
    }
  }, RETRY_DELAY);
  retryTimers.set(socketId, t);
};

/* -------------------------------------------------------------------------- */
/*                                Offer flow                                  */
/* -------------------------------------------------------------------------- */

export const createOffer = async (
  socketId: string,
  selfSocketId: string,
  stream: MediaStream,
  sendMessage: (message: Message) => void,
  isRetry = false,
) => {
  if (!isRetry && peerConnections.has(socketId)) return; // duplicate guard
  removePeer(socketId);

  const peer = new RTCPeerConnection(peerConfiguration);

  // Attach local media
  stream.getTracks().forEach(t => peer.addTrack(t, stream));

  peer.ontrack = e => {
    useMeetingParticipantStore
      .getState()
      .updateParticipantStream(socketId, e.streams[0] ?? null);
  };

  peer.onconnectionstatechange = () => {
    const cs = peer.connectionState;
    if ((cs === 'failed' || cs === 'disconnected') && canRetry(socketId)) {
      incrementRetryCount(socketId);
      scheduleRetryOffer(socketId, selfSocketId, stream, sendMessage);
    }
  };

  peer.oniceconnectionstatechange = () => {
    if (peer.iceConnectionState === 'failed' && canRetry(socketId)) {
      incrementRetryCount(socketId);
      scheduleRetryOffer(socketId, selfSocketId, stream, sendMessage);
    }
  };

  peer.onicecandidate = e => {
    if (e.candidate) {
      // slight delay prevents racing before remote sets SDP
      setTimeout(() => {
        sendMessage({
          type: 'webrtc:ice-candidate',
          data: {
            from: selfSocketId,
            to: socketId,
            candidate: e.candidate!.toJSON(),
          },
        });
      }, 500);
    }
  };

  try {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    sendMessage({
      type: 'webrtc:offer',
      data: {
        sdp: { type: offer.type as 'offer', sdp: offer.sdp! },
        from: selfSocketId,
        to: socketId,
      },
    });

    peerConnections.set(socketId, {
      peer,
      iceCandidates: [],
      isRemoteDescriptionSet: false,
      retryCount: isRetry ? (getPeerState(socketId)?.retryCount ?? 0) : 0,
      lastRetryTime: isRetry ? (getPeerState(socketId)?.lastRetryTime ?? 0) : 0,
    });

    startHealthCheck(socketId);
  } catch {
    peer.close();
    scheduleRetryOffer(socketId, selfSocketId, stream, sendMessage);
  }
};

/* -------------------------------------------------------------------------- */
/*                               Answer flow                                  */
/* -------------------------------------------------------------------------- */

export const createAnswer = async (
  socketId: string,
  selfSocketId: string,
  sdp: RTCSessionDescriptionInit,
  stream: MediaStream,
  sendMessage: (message: Message) => void,
) => {
  removePeer(socketId);
  const peer = new RTCPeerConnection(peerConfiguration);

  stream.getTracks().forEach(t => peer.addTrack(t, stream));
  peer.ontrack = e =>
    useMeetingParticipantStore
      .getState()
      .updateParticipantStream(socketId, e.streams[0] ?? null);

  peer.onicecandidate = e => {
    if (e.candidate) {
      setTimeout(() => {
        sendMessage({
          type: 'webrtc:ice-candidate',
          data: {
            from: selfSocketId,
            to: socketId,
            candidate: e.candidate!.toJSON(),
          },
        });
      }, 500);
    }
  };

  try {
    await peer.setRemoteDescription(new RTCSessionDescription(sdp));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    const state: PeerState = {
      peer,
      iceCandidates: [],
      isRemoteDescriptionSet: true,
      retryCount: 0,
      lastRetryTime: 0,
    };
    peerConnections.set(socketId, state);

    sendMessage({
      type: 'webrtc:answer',
      data: {
        sdp: { type: answer.type as 'answer', sdp: answer.sdp! },
        from: selfSocketId,
        to: socketId,
      },
    });

    await flushIceCandidates(socketId);
    startHealthCheck(socketId);
  } catch {
    peer.close();
  }
};

/* -------------------------------------------------------------------------- */
/*                          External signaling hooks                          */
/* -------------------------------------------------------------------------- */

export const addIceCandidate = (socketId: string, cand: RTCIceCandidateInit) =>
  addIceCandidateSafely(socketId, cand);

export const setRemoteDescription = async (
  socketId: string,
  sdp: RTCSessionDescriptionInit,
) => {
  const state = getPeerState(socketId);
  if (!state) return;
  try {
    await state.peer.setRemoteDescription(new RTCSessionDescription(sdp));
    state.isRemoteDescriptionSet = true;
    await flushIceCandidates(socketId);
  } catch {
    /* swallow */
  }
};
