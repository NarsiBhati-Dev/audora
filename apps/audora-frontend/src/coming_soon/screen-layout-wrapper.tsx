// 'use client';
// import { useState, useEffect } from 'react';
// import { useMeetingStore } from '@/store/meeting-store';
// import { useMeetingParticipantStore } from '@/store/meeting-participant-store';

// // import { FiMicOff, FiVideoOff } from 'react-icons/fi';
// import VideoTile from '@/components/studio/meeting/VideoTile';
// import HostView from '@/components/studio/meeting/host-view';
// import { useSystemStreamStore } from '@/store/system-stream';

// const getGridCols = (participantCount: number) => {
//     if (participantCount <= 2) return 'grid-cols-1';
//     if (participantCount === 3) return 'grid-cols-2';
//     if (participantCount === 4) return 'grid-cols-2';
//     return 'grid-cols-3';
// };

// // const ParticipantStatus = ({ participant }: { participant: any }) => (
// //     <div className="absolute bottom-2 right-2 flex gap-2">
// //         {!participant.isMicOn && (
// //             <div className="bg-red-500/80 p-1 rounded-full">
// //                 <FiMicOff className="w-4 h-4" />
// //             </div>
// //         )}
// //         {!participant.isCameraOn && (
// //             <div className="bg-red-500/80 p-1 rounded-full">
// //                 <FiVideoOff className="w-4 h-4" />
// //             </div>
// //         )}
// //     </div>
// // );

// export default function ScreenLayoutWrapper({ isGuest }: { isGuest: boolean }) {
//     const { layout } = useMeetingStore();
//     const { participants = [] } = useMeetingParticipantStore();
//     const [isLoading, setIsLoading] = useState(true);
//     const { stream, camOn, micOn } = useSystemStreamStore();

//     useEffect(() => {
//         // Simulate loading state
//         const timer = setTimeout(() => setIsLoading(false), 500);
//         return () => clearTimeout(timer);
//     }, [participants]);

//     const getLayout = () => {
//         if (isLoading) {
//             return (
//                 <div className='flex h-full w-full items-center justify-center'>
//                     <div className='h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-white'></div>
//                 </div>
//             );
//         }

//         if (!participants.length && !isGuest) {
//             return <HostView localStream={stream} cameraOn={camOn} />;
//         }

//         switch (layout) {
//             case 'grid':
//                 const totalParticipants = participants.length + 1;
//                 const isTwoParticipants = totalParticipants === 2;
//                 return (
//                     <div
//                         className={`${isTwoParticipants
//                             ? 'flex items-center justify-center'
//                             : `grid ${getGridCols(totalParticipants)} place-items-center`
//                             } h-full w-full gap-4 p-6 transition-all duration-300`}
//                     >
//                         <VideoTile
//                             label='You'
//                             stream={stream}
//                             isSelf={true}
//                             borderColor={camOn ? 'border-gray-600' : 'border-red-500'}
//                             camOn={camOn}
//                             micOn={micOn}
//                         />
//                         {participants.map(p => (
//                             <VideoTile
//                                 key={p.id}
//                                 label={p.name}
//                                 stream={p.stream}
//                                 borderColor={
//                                     p.isCameraOn ? 'border-gray-600' : 'border-red-500'
//                                 }
//                                 camOn={p.isCameraOn}
//                                 micOn={p.isMicOn}
//                             />
//                         ))}
//                     </div>
//                 );
//             case 'speaker-full':
//                 return (
//                     <div className='h-full w-full p-6 transition-all duration-300'>
//                         <VideoTile
//                             label={participants[0]?.name || 'Speaker'}
//                             stream={participants[0]?.stream}
//                             borderColor={
//                                 participants[0]?.isCameraOn
//                                     ? 'border-gray-600'
//                                     : 'border-red-500'
//                             }
//                         />
//                     </div>
//                 );
//             case 'speaker-split':
//                 return (
//                     <div className='flex h-full w-full flex-row gap-6 p-6 transition-all duration-300'>
//                         <div className='flex-1'>
//                             <VideoTile
//                                 label={participants[0]?.name || 'Speaker'}
//                                 stream={participants[0]?.stream}
//                                 borderColor={
//                                     participants[0]?.isCameraOn
//                                         ? 'border-gray-600'
//                                         : 'border-red-500'
//                                 }
//                                 camOn={participants[0]?.isCameraOn}
//                                 micOn={participants[0]?.isMicOn}
//                             />
//                         </div>
//                         <div className='flex h-full w-md flex-col gap-4 overflow-hidden'>
//                             {/* Local video */}
//                             <VideoTile
//                                 label='You'
//                                 stream={stream}
//                                 isSelf={true}
//                                 borderColor={camOn ? 'border-gray-600' : 'border-red-500'}
//                                 camOn={camOn}
//                                 micOn={micOn}
//                             />
//                             {/* Other participants */}
//                             {participants.slice(1).map(p => (
//                                 <VideoTile
//                                     key={p.id}
//                                     label={p.name}
//                                     stream={p.stream}
//                                     borderColor={
//                                         p.isCameraOn ? 'border-gray-600' : 'border-red-500'
//                                     }
//                                     camOn={p.isCameraOn}
//                                     micOn={p.isMicOn}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 );
//         }
//     };

//     return (
//         <div className='relative h-[calc(100vh-150px)] w-full bg-black text-white transition-all duration-300'>
//             {getLayout()}
//         </div>
//     );
// }
