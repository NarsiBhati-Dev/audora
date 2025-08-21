'use client';

import React, { useState } from 'react';
import { VideoIcon, Square } from 'lucide-react';
import clsx from 'clsx';
import { useMeetingParticipantStore } from '@/store/webrtc/meeting-participant-store';
import { useStudioSettingsStore } from '@/store/studio/studio-settings-store';
import { useSystemStreamStore } from '@/store/webrtc/system-stream';
import { useAdvancedRecording } from '@/hooks/recording/useAdvancedRecording';
import { toast } from 'react-hot-toast';

interface RecordingButtonProps {
    isGuest?: boolean;
    className?: string;
}

const RecordingButton = ({
    isGuest = false,
    className,
}: RecordingButtonProps) => {
    const { stream } = useSystemStreamStore();
    const {
        isRecording,
        isCountdownActive,
        countdownValue,
        chunkIndex,
        totalDuration,
        startRecording,
        stopRecording,
        formatDuration,
    } = useAdvancedRecording({
        stream,
        chunkDurationMs: 5000, // 5 seconds per chunk
        countdownDuration: 5,
        mimeType: 'video/webm;codecs=vp9,opus',
        onChunkAvailable: (chunk) => {
            toast.success('Chunk available', {
                duration: 3000,
            });
        },
        onRecordingStart: () => {
            toast.success('Recording started', {
                duration: 3000,
            });
        },
        onRecordingStop: () => {
            toast.success('Recording stopped', {
                duration: 3000,
            });
        },
        onError: (error) => {
            toast.error('Recording error', {
                duration: 3000,
            });
        },
    });

    const [isHovered, setIsHovered] = useState(false);
    const trackId = useMeetingParticipantStore.getState().self?.trackId;
    const projectId = useMeetingParticipantStore.getState().self?.projectId;
    const { studioSetting } = useStudioSettingsStore();

    const onStartRecording = () => startRecording();
    const onStopRecording = () => stopRecording();

    const handleRecordToggle = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    // Don't show recording button for guests
    if (isGuest) return null;

    return (
        <div className={clsx('flex flex-col items-center gap-2', className)}>
            {/* Main Recording Button */}
            <div className='relative'>
                <button
                    onClick={handleRecordToggle}
                    // disabled={isRecording}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={clsx(
                        'flex items-center justify-center font-medium transition-all duration-300 relative overflow-hidden',
                        {
                            'h-14 w-32 rounded-xl bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25':
                                isRecording,
                            'h-14 w-32 rounded-xl bg-red-600 text-white hover:bg-red-700 shadow-lg':
                                !isRecording,
                            'h-14 w-32 rounded-xl bg-orange-500 text-white cursor-not-allowed shadow-lg':
                                isRecording,
                            'opacity-50 cursor-not-allowed': isRecording,
                        }
                    )}
                >
                    {/* Recording pulse effect */}
                    {isRecording && (
                        <div className='absolute inset-0 bg-red-400 rounded-xl animate-pulse opacity-20'></div>
                    )}

                    <div className='relative flex items-center gap-2'>
                        {isRecording ? (
                            <Square className='h-5 w-5' />
                        ) : (
                            <VideoIcon className='h-5 w-5' />
                        )}
                        <span className='text-sm font-semibold'>
                            {isRecording ? 'Stop' : 'Record'}
                        </span>
                    </div>
                </button>


            </div>



            {/* Hover tooltip */}
            {
                isHovered && !isRecording && (
                    <div className='absolute bottom-full mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap'>
                        Start recording
                    </div>
                )
            }
        </div >
    );
};

export default RecordingButton;