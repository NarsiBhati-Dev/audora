// 'use client';

// import React, { useState } from 'react';
// import { VideoIcon, Square, Circle } from 'lucide-react';
// import { useAdvancedRecording } from '@/hooks/recording/useAdvancedRecording';
// import { useSystemStreamStore } from '@/store/webrtc/system-stream';
// import { toast } from 'react-hot-toast';
// import clsx from 'clsx';

// interface AdvancedRecordingExampleProps {
//     className?: string;
// }

// const AdvancedRecordingExample = ({ className }: AdvancedRecordingExampleProps) => {
//     const { stream } = useSystemStreamStore();
//     const [chunks, setChunks] = useState<any[]>([]);
//     const [isHovered, setIsHovered] = useState(false);

//     const {
//         isRecording,
//         isCountdownActive,
//         countdownValue,
//         chunkIndex,
//         totalDuration,
//         startRecording,
//         stopRecording,
//         formatDuration,
//     } = useAdvancedRecording({
//         stream,
//         chunkDurationMs: 5000, // 5 seconds per chunk
//         countdownDuration: 5,
//         mimeType: 'video/webm;codecs=vp9,opus',
//         onChunkAvailable: (chunk) => {
//             console.log('Chunk available:', chunk);
//             setChunks(prev => [...prev, chunk]);
//             console.log('Chunks:', chunks);

//             // Here you can upload the chunk or process it
//             // Example: uploadChunk(chunk);

//             toast.success(`Chunk ${chunk.index} recorded (${Math.round(chunk.size / 1024)}KB)`);
//         },
//         onRecordingStart: () => {
//             console.log('Recording started');
//             setChunks([]); // Clear previous chunks
//             toast.success('Recording started!');
//         },
//         onRecordingStop: () => {
//             console.log('Recording stopped');
//             toast.success('Recording stopped!');
//         },
//         onCountdownStart: () => {
//             console.log('Countdown started');
//         },
//         onCountdownComplete: () => {
//             console.log('Countdown completed');
//         },
//         onError: (error) => {
//             console.error('Recording error:', error);
//             toast.error('Recording error: ' + error.message);
//         },
//     });

//     const handleRecordToggle = () => {
//         if (isRecording || isCountdownActive) {
//             stopRecording();
//         } else {
//             startRecording();
//         }
//     };

//     return (
//         <div className={clsx('flex flex-col items-center gap-4', className)}>
//             {/* Main Recording Button */}
//             <div className='relative'>
//                 <button
//                     onClick={handleRecordToggle}
//                     disabled={isCountdownActive}
//                     onMouseEnter={() => setIsHovered(true)}
//                     onMouseLeave={() => setIsHovered(false)}
//                     className={clsx(
//                         'flex items-center justify-center font-medium transition-all duration-300 relative overflow-hidden',
//                         {
//                             'h-16 w-36 rounded-xl bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25':
//                                 isRecording,
//                             'h-16 w-36 rounded-xl bg-red-600 text-white hover:bg-red-700 shadow-lg':
//                                 !isRecording && !isCountdownActive,
//                             'h-16 w-36 rounded-xl bg-orange-500 text-white cursor-not-allowed shadow-lg':
//                                 isCountdownActive,
//                             'opacity-50 cursor-not-allowed': isCountdownActive,
//                         }
//                     )}
//                 >
//                     {/* Recording pulse effect */}
//                     {isRecording && (
//                         <div className='absolute inset-0 bg-red-400 rounded-xl animate-pulse opacity-20'></div>
//                     )}

//                     {/* Countdown effect */}
//                     {isCountdownActive && (
//                         <div className='absolute inset-0 bg-orange-400 rounded-xl animate-pulse opacity-20'></div>
//                     )}

//                     <div className='relative flex items-center gap-2'>
//                         {isRecording ? (
//                             <Square className='h-6 w-6' />
//                         ) : isCountdownActive ? (
//                             <Circle className='h-6 w-6 animate-pulse' />
//                         ) : (
//                             <VideoIcon className='h-6 w-6' />
//                         )}
//                         <span className='text-sm font-semibold'>
//                             {isRecording ? 'Stop' : isCountdownActive ? countdownValue : 'Record'}
//                         </span>
//                     </div>
//                 </button>

//                 {/* Recording indicator ring */}
//                 {isRecording && (
//                     <div className='absolute -inset-1 bg-red-500 rounded-xl animate-ping opacity-20'></div>
//                 )}
//             </div>

//             {/* Recording Status */}
//             {isRecording && (
//                 <div className='text-center'>
//                     <div className='text-lg font-bold text-red-500'>
//                         {formatDuration(totalDuration)}
//                     </div>
//                     <div className='text-sm text-gray-600'>
//                         Chunk {chunkIndex} • {chunks.length} chunks recorded
//                     </div>
//                 </div>
//             )}

//             {/* Countdown Display */}
//             {isCountdownActive && (
//                 <div className='text-center'>
//                     <div className='text-2xl font-bold text-orange-500 animate-pulse'>
//                         {countdownValue}
//                     </div>
//                     <div className='text-sm text-gray-600'>
//                         Recording starts in...
//                     </div>
//                 </div>
//             )}

//             {/* Chunks List */}
//             {chunks.length > 0 && (
//                 <div className='w-full max-w-md'>
//                     <h3 className='text-lg font-semibold mb-2'>Recorded Chunks:</h3>
//                     <div className='space-y-2 max-h-40 overflow-y-auto'>
//                         {chunks.map((chunk, index) => (
//                             <div
//                                 key={chunk.timestamp}
//                                 className='flex justify-between items-center p-2 bg-gray-100 rounded'
//                             >
//                                 <span className='text-sm font-medium'>
//                                     Chunk {chunk.index}
//                                 </span>
//                                 <div className='text-xs text-gray-600'>
//                                     <div>{Math.round(chunk.size / 1024)}KB</div>
//                                     <div>{formatDuration(chunk.endTime - chunk.startTime)}</div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Hover tooltip */}
//             {isHovered && !isRecording && !isCountdownActive && (
//                 <div className='absolute bottom-full mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap'>
//                     Start recording with 5-second countdown
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdvancedRecordingExample; 