'use client';

import { useEffect, useRef } from 'react';
import { useMeetingStore } from '@/store/meeting-store';
import { useSystemStreamStore } from '@/store/system-stream';
import { CameraOffIcon, MicrophoneOffIcon } from '@/data/icons';

type Props = {
    label: string;
    stream: MediaStream | null | undefined;
    borderColor?: string;
    isSelf?: boolean;
};

export default function VideoTile({
    label,
    stream,
    borderColor = 'border-gray-600',
    isSelf = false,
}: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { fitMode } = useMeetingStore();
    const { camOn, micOn } = useSystemStreamStore();

    useEffect(() => {
        if (videoRef.current && stream && camOn) {
            videoRef.current.srcObject = stream;
        }
    }, [stream, camOn]);

    return (
        <div
            className={`relative rounded-xl overflow-hidden border-2 border-transparent ${borderColor} w-full h-full bg-dashboard-bg-darkest flex transition-all duration-300 hover:border-primary-500`}
        >
            {camOn && stream ? (
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className={`w-full h-full bg-dashboard-bg-darkest transition-transform duration-300 ${isSelf ? 'scale-x-[-1]' : ''
                        } ${fitMode === 'fill' ? 'object-cover' : 'object-contain'}`}
                />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white bg-black/70">
                    <CameraOffIcon className="w-10 h-10 mb-2 text-red-500" />
                    <span className="text-sm">Camera is off</span>
                </div>
            )}

            <div className="absolute bottom-2 left-3 text-white bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                {label}
            </div>
        </div>
    );
}