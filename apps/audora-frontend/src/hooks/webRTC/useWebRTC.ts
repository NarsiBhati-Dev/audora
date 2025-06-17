// import { useState, useEffect, useCallback } from 'react';
// import { useMeetingParticipantStore } from '@/store/meeting-store';

// interface PeerConnection {
//   peerId: string;
//   connection: RTCPeerConnection;
//   stream: MediaStream | null;
// }

// export const useWebRTC = (localStream: MediaStream | null) => {
//   const [peerConnections, setPeerConnections] = useState<
//     Map<string, PeerConnection>
//   >(new Map());
//   const {
//     participants,
//     addParticipant,
//     removeParticipant,
//     updateParticipantStream,
//   } = useMeetingParticipantStore();

//   const createPeerConnection = useCallback(
//     (peerId: string) => {
//       const configuration: RTCConfiguration = {
//         iceServers: [
//           { urls: 'stun:stun.l.google.com:19302' },
//           // Add your TURN server configuration here if needed
//         ],
//       };

//       const peerConnection = new RTCPeerConnection(configuration);

//       // Add local stream tracks to the peer connection
//       if (localStream) {
//         localStream.getTracks().forEach(track => {
//           peerConnection.addTrack(track, localStream);
//         });
//       }

//       // Handle incoming streams
//       peerConnection.ontrack = event => {
//         const [stream] = event.streams;
//         updateParticipantStream(peerId, stream || null);
//       };

//       // Handle ICE candidates
//       peerConnection.onicecandidate = event => {
//         if (event.candidate) {
//           // Send the ICE candidate to the signaling server
//           // This will be implemented when we add signaling
//           console.log('New ICE candidate:', event.candidate);
//         }
//       };

//       // Handle connection state changes
//       peerConnection.onconnectionstatechange = () => {
//         if (
//           peerConnection.connectionState === 'disconnected' ||
//           peerConnection.connectionState === 'failed' ||
//           peerConnection.connectionState === 'closed'
//         ) {
//           removeParticipant(peerId);
//           setPeerConnections(prev => {
//             const newMap = new Map(prev);
//             newMap.delete(peerId);
//             return newMap;
//           });
//         }
//       };

//       return peerConnection;
//     },
//     [localStream, updateParticipantStream, removeParticipant],
//   );

//   const connectToPeer = useCallback(
//     async (peerId: string) => {
//       if (peerConnections.has(peerId)) return;

//       const peerConnection = createPeerConnection(peerId);
//       setPeerConnections(prev =>
//         new Map(prev).set(peerId, {
//           peerId,
//           connection: peerConnection,
//           stream: null,
//         }),
//       );

//       // Create and send offer
//       try {
//         const offer = await peerConnection.createOffer();
//         await peerConnection.setLocalDescription(offer);
//         // Send the offer to the signaling server
//         // This will be implemented when we add signaling
//         console.log('Created offer:', offer);
//       } catch (error) {
//         console.error('Error creating offer:', error);
//       }
//     },
//     [createPeerConnection, peerConnections],
//   );

//   const handleAnswer = useCallback(
//     async (peerId: string, answer: RTCSessionDescriptionInit) => {
//       const peerConnection = peerConnections.get(peerId)?.connection;
//       if (!peerConnection) return;

//       try {
//         await peerConnection.setRemoteDescription(
//           new RTCSessionDescription(answer),
//         );
//       } catch (error) {
//         console.error('Error setting remote description:', error);
//       }
//     },
//     [peerConnections],
//   );

//   const handleIceCandidate = useCallback(
//     async (peerId: string, candidate: RTCIceCandidateInit) => {
//       const peerConnection = peerConnections.get(peerId)?.connection;
//       if (!peerConnection) return;

//       try {
//         await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//       } catch (error) {
//         console.error('Error adding ICE candidate:', error);
//       }
//     },
//     [peerConnections],
//   );

//   // Cleanup function
//   useEffect(() => {
//     return () => {
//       peerConnections.forEach(({ connection }) => {
//         connection.close();
//       });
//     };
//   }, [peerConnections]);

//   return {
//     connectToPeer,
//     handleAnswer,
//     handleIceCandidate,
//     peerConnections,
//   };
// };
