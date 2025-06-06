'use client';

import { useEffect, useRef } from "react";

type Props = {
    label: string;
    stream: MediaStream | null | undefined;
    borderColor?: string;
    isSelf?: boolean;
};

export default function VideoTile({ label, stream, borderColor = "border-gray-600", isSelf = false }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className={`relative rounded-xl overflow-hidden border-2 border-dashboard-bg ${borderColor} w-full h-full bg-black flex transition-all duration-300 hover:border-primary-500`}>
            <video
                ref={videoRef}
                autoPlay
                muted
                className={`w-full h-full object-cover transition-transform duration-300 ${isSelf && 'scale-x-[-1]'}`}
            />
            <div className="absolute bottom-2 left-3 text-white bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                {label}
            </div>
        </div>
    );
}