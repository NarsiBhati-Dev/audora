import { Message } from '@audora/types';
import { useMeetingParticipantStore } from '@/modules/webrtc/store/meeting-participant-store';

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
const MAX_RETRY_COUNT = 3;
const RETRY_DELAY = 2000;

//  Connection Health Check
const connectionHealthChecks = new Map<string, NodeJS.Timeout>();

const startHealthCheck = (socketId: string) => {
  // Clear existing health check
  stopHealthCheck(socketId);

  const healthCheck = setInterval(() => {
    const state = getPeerState(socketId);
    if (!state) {
      stopHealthCheck(socketId);
      return;
    }

    const { peer } = state;

    // Check connection state
    if (
      peer.connectionState === 'failed' ||
      peer.connectionState === 'disconnected'
    ) {
      // console.warn(
      //   `[WebRTC] Health check: Connection unhealthy for ${socketId}`,
      // );
      stopHealthCheck(socketId);

      // Try to reconnect if possible
      if (canRetry(socketId)) {
        // console.log(
        //   `[WebRTC] Health check: Attempting reconnection for ${socketId}`,
        // );
        incrementRetryCount(socketId);
      }
    } else if (peer.connectionState === 'connected') {
      // console.log(`[WebRTC] Health check: Connection healthy for ${socketId}`);
    }
  }, 10000); // Check every 10 seconds

  connectionHealthChecks.set(socketId, healthCheck);
};

const stopHealthCheck = (socketId: string) => {
  const healthCheck = connectionHealthChecks.get(socketId);
  if (healthCheck) {
    clearInterval(healthCheck);
    connectionHealthChecks.delete(socketId);
  }
};

const clearAllHealthChecks = () => {
  connectionHealthChecks.forEach(healthCheck => {
    clearInterval(healthCheck);
  });
  connectionHealthChecks.clear();
};

// Getters & Cleaners

export const getPeer = (socketId: string): RTCPeerConnection | null => {
  return peerConnections.get(socketId)?.peer || null;
};

export const getPeerState = (socketId: string): PeerState | null => {
  return peerConnections.get(socketId) || null;
};

export const removePeer = (socketId: string) => {
  const state = peerConnections.get(socketId);
  if (state) {
    state.peer.close();
    peerConnections.delete(socketId);
    stopHealthCheck(socketId);
    // console.log(`[WebRTC] Closed connection with ${socketId}`);
  }
};

export const clearAllPeers = () => {
  peerConnections.forEach(({ peer }) => {
    peer.close();
    // console.log(`[WebRTC] Closed connection with ${socketId}`);
  });
  peerConnections.clear();
  clearAllHealthChecks();
};

// ICE Candidate Management

const addIceCandidateSafely = async (
  socketId: string,
  candidate: RTCIceCandidateInit,
) => {
  const state = getPeerState(socketId);
  if (!state) {
    // console.warn(`[WebRTC] No peer found for ${socketId}`);
    return;
  }

  // If remote description is not set yet, queue the candidate
  if (!state.isRemoteDescriptionSet) {
    state.iceCandidates.push(candidate);
    // console.log(
    //   `[WebRTC] Queued ICE candidate for ${socketId}, waiting for remote description`,
    // );
    return;
  }

  try {
    await state.peer.addIceCandidate(new RTCIceCandidate(candidate));
    // console.log(`[WebRTC] Added ICE candidate from ${socketId}`);
  } catch {
    // console.error(`[WebRTC] Error adding ICE candidate for ${socketId}:`, err);
  }
};

const flushIceCandidates = async (socketId: string) => {
  const state = getPeerState(socketId);
  if (!state || state.iceCandidates.length === 0) return;

  // console.log(
  //   `[WebRTC] Flushing ${state.iceCandidates.length} queued ICE candidates for ${socketId}`,
  // );

  for (const candidate of state.iceCandidates) {
    try {
      await state.peer.addIceCandidate(new RTCIceCandidate(candidate));
      // console.log(`[WebRTC] Added queued ICE candidate from ${socketId}`);
    } catch {
      // console.error(
      //   `[WebRTC] Error adding queued ICE candidate for ${socketId}:`,
      //   err,
      // );
    }
  }

  state.iceCandidates = [];
};

// Retry Mechanism

const canRetry = (socketId: string): boolean => {
  const state = getPeerState(socketId);
  if (!state) return false;

  const now = Date.now();
  return (
    state.retryCount < MAX_RETRY_COUNT &&
    now - state.lastRetryTime > RETRY_DELAY
  );
};

const incrementRetryCount = (socketId: string) => {
  const state = getPeerState(socketId);
  if (state) {
    state.retryCount++;
    state.lastRetryTime = Date.now();
  }
};

// WebRTC Offer

export const createOffer = async (
  socketId: string,
  selfSocketId: string,
  stream: MediaStream,
  sendMessage: (message: Message) => void,
  isRetry = false,
) => {
  // Clean up existing connection if any
  removePeer(socketId);

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

  // Handle connection state changes
  peer.onconnectionstatechange = () => {
    // console.log(
    //   `[WebRTC] Connection state with ${socketId}:`,
    //   peer.connectionState,
    // );
    if (
      peer.connectionState === 'failed' ||
      peer.connectionState === 'disconnected'
    ) {
      // console.warn(`[WebRTC] Connection failed/disconnected with ${socketId}`);

      // Try to reconnect if possible
      if (canRetry(socketId)) {
        // const currentRetryCount = getPeerState(socketId)?.retryCount || 0;
        // console.log(
        //   `[WebRTC] Attempting to reconnect with ${socketId} (attempt ${currentRetryCount + 1})`,
        // );
        incrementRetryCount(socketId);
        setTimeout(() => {
          createOffer(socketId, selfSocketId, stream, sendMessage, true);
        }, RETRY_DELAY);
      }
    }
  };

  // Handle ICE connection state changes
  peer.oniceconnectionstatechange = () => {
    // console.log(
    //   `[WebRTC] ICE connection state with ${socketId}:`,
    //   peer.iceConnectionState,
    // );
    if (peer.iceConnectionState === 'failed' && canRetry(socketId)) {
      // console.log(
      //   `[WebRTC] ICE connection failed, attempting restart for ${socketId}`,
      // );
      incrementRetryCount(socketId);
      setTimeout(() => {
        createOffer(socketId, selfSocketId, stream, sendMessage, true);
      }, RETRY_DELAY);
    }
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

  try {
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

    peerConnections.set(socketId, {
      peer,
      iceCandidates: [],
      isRemoteDescriptionSet: false,
      retryCount: isRetry ? getPeerState(socketId)?.retryCount || 0 : 0,
      lastRetryTime: isRetry ? getPeerState(socketId)?.lastRetryTime || 0 : 0,
    });

    // Start health check for this connection
    startHealthCheck(socketId);

    // console.log(
    //   `[WebRTC] Created offer for ${socketId}${isRetry ? ' (retry)' : ''}`,
    // );
  } catch {
    // console.error(`[WebRTC] Error creating offer for ${socketId}:`, err);
    peer.close();

    // Retry on error if possible
    if (canRetry(socketId)) {
      // console.log(`[WebRTC] Retrying offer creation for ${socketId}`);
      incrementRetryCount(socketId);
      setTimeout(() => {
        createOffer(socketId, selfSocketId, stream, sendMessage, true);
      }, RETRY_DELAY);
    }
  }
};

// WebRTC Answer

export const createAnswer = async (
  socketId: string,
  selfSocketId: string,
  sdp: RTCSessionDescriptionInit,
  stream: MediaStream,
  sendMessage: (message: Message) => void,
) => {
  // Clean up existing connection if any
  removePeer(socketId);

  const peer = new RTCPeerConnection(peerConfiguration);

  stream.getTracks().forEach(track => peer.addTrack(track, stream));

  peer.ontrack = event => {
    const remoteStream = event.streams[0];
    useMeetingParticipantStore
      .getState()
      .updateParticipantStream(socketId, remoteStream || null);
  };

  // Handle connection state changes
  peer.onconnectionstatechange = () => {
    // console.log(
    //   `[WebRTC] Connection state with ${socketId}:`,
    //   peer.connectionState,
    // );
    if (
      peer.connectionState === 'failed' ||
      peer.connectionState === 'disconnected'
    ) {
      // console.warn(`[WebRTC] Connection failed/disconnected with ${socketId}`);
    }
  };

  // Handle ICE connection state changes
  peer.oniceconnectionstatechange = () => {
    //  console.log(
    //   `[WebRTC] ICE connection state with ${socketId}:`,
    //   peer.iceConnectionState,
    // );
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

  try {
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

    const state = {
      peer,
      iceCandidates: [],
      isRemoteDescriptionSet: true,
      retryCount: 0,
      lastRetryTime: 0,
    };
    peerConnections.set(socketId, state);

    // Start health check for this connection
    startHealthCheck(socketId);

    // Flush any queued ICE candidates
    await flushIceCandidates(socketId);

    // console.log(`[WebRTC] Created answer for ${socketId}`);
  } catch {
    // console.error(`[WebRTC] Error creating answer for ${socketId}:`, err);
    peer.close();
  }
};

// Add ICE Candidate (called on ice-candidate message)

export const addIceCandidate = async (
  socketId: string,
  candidate: RTCIceCandidateInit,
) => {
  await addIceCandidateSafely(socketId, candidate);
};

// Set Remote Description (called on offer/answer message)

export const setRemoteDescription = async (
  socketId: string,
  sdp: RTCSessionDescriptionInit,
) => {
  const state = getPeerState(socketId);
  if (!state) {
    // console.warn(`[WebRTC] No peer found for ${socketId}`);
    return;
  }

  try {
    await state.peer.setRemoteDescription(new RTCSessionDescription(sdp));
    state.isRemoteDescriptionSet = true;
    // console.log(`[WebRTC] Set remote description for ${socketId}`);

    // Flush any queued ICE candidates
    await flushIceCandidates(socketId);
  } catch {
    // console.error(
    //   `[WebRTC] Error setting remote description for ${socketId}:`,
    //   err,
    // );
  }
};
