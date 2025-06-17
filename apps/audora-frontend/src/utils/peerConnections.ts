import { Message } from '@audora/types';
import { useOneToOneStore } from '@/store/one-to-one-store';

type PeerConnectionWithState = {
  peer: RTCPeerConnection;
  pendingCandidates: RTCIceCandidateInit[];
  remoteDescriptionSet: boolean;
};

const peerConnections = new Map<string, PeerConnectionWithState>();

export const createPeer = (
  socketId: string,
  selfSocketId: string,
  localStream: MediaStream,
  sendMessage: (message: Message) => void,
  polite: boolean = true,
): RTCPeerConnection => {
  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  });

  // ICE candidate handler
  peer.onicecandidate = event => {
    if (event.candidate) {
      sendMessage({
        type: 'webrtc:ice-candidate',
        data: {
          candidate: event.candidate,
          to: socketId,
          from: selfSocketId,
        },
      });
    }
  };

  // ICE state change logging
  peer.oniceconnectionstatechange = () => {
    console.log(`[ICE] ${socketId} =>`, peer.iceConnectionState);
  };

  // Remote stream handler
  peer.ontrack = event => {
    const remoteStream = event.streams[0];
    if (!remoteStream) return;

    const currentStream = useOneToOneStore.getState().peer?.stream;
    if (currentStream?.id === remoteStream.id) return;

    console.log('[WebRTC] Received remote stream:', remoteStream);
    useOneToOneStore.getState().updatePeer({ stream: remoteStream });
  };

  // Negotiation handler (only for polite peer)
  peer.onnegotiationneeded = async () => {
    if (!polite) return;
    try {
      if (peer.signalingState !== 'stable') return;
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
    } catch (err) {
      console.error('[WebRTC] Negotiation error:', err);
    }
  };

  // Add local media tracks to the peer connection
  localStream.getTracks().forEach(track => {
    peer.addTrack(track, localStream);
  });

  // Save peer to connection map
  peerConnections.set(socketId, {
    peer,
    pendingCandidates: [],
    remoteDescriptionSet: false,
  });

  return peer;
};

export const closePeerConnection = (socketId: string) => {
  const state = peerConnections.get(socketId);
  if (state) {
    state.peer.close();
    peerConnections.delete(socketId);
    console.log(`[WebRTC] Closed connection with ${socketId}`);
  }
};

export const clearAllConnections = () => {
  peerConnections.forEach((state, socketId) => {
    state.peer.close();
    console.log(`[WebRTC] Closed connection with ${socketId}`);
  });
  peerConnections.clear();
};

export { peerConnections };
