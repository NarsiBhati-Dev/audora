'use client';
import { useState, useEffect } from 'react';
import { useMeetingParticipantStore, useMeetingStore } from '@/store/meeting-store';
import { FiMicOff, FiVideoOff } from 'react-icons/fi';
import VideoTile from './VideoTile';
import { useMediaDevices } from '@/hooks/useMediaDevices';
import HostView from './host-view';

const getGridCols = (participantCount: number) => {
    if (participantCount + 1 <= 2) return 'grid-cols-1';
    if (participantCount + 1 <= 4) return 'grid-cols-2';
    if (participantCount + 1 <= 6) return 'grid-cols-3';
    return 'grid-cols-4';
};

const ParticipantStatus = ({ participant }: { participant: any }) => (
    <div className="absolute bottom-2 right-2 flex gap-2">
        {!participant.isMicOn && (
            <div className="bg-red-500/80 p-1 rounded-full">
                <FiMicOff className="w-4 h-4" />
            </div>
        )}
        {!participant.isCameraOn && (
            <div className="bg-red-500/80 p-1 rounded-full">
                <FiVideoOff className="w-4 h-4" />
            </div>
        )}
    </div>
);



export default function ScreenLayoutWrapper() {
    const { layout } = useMeetingStore();
    const { participants } = useMeetingParticipantStore();
    const [isLoading, setIsLoading] = useState(true);
    const { stream: localStream, cameraOn } = useMediaDevices();

    useEffect(() => {
        // Simulate loading state
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, [participants]);

    const getLayout = () => {
        if (isLoading) {
            return (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
            );
        }

        if (!participants.length) {
            return <HostView localStream={localStream} cameraOn={cameraOn} />;
        }

        switch (layout) {
            case 'grid':
                return (
                    <div className={`grid ${getGridCols(participants.length + 1)} gap-4 w-full h-full p-6 transition-all duration-300 place-items-center`}>
                        {/* Local video */}
                        <VideoTile
                            label="You"
                            stream={localStream}
                            isSelf={true}
                            borderColor={cameraOn ? "border-gray-600" : "border-red-500"}
                        />
                        {/* Other participants */}
                        {participants.map((p) => (
                            <VideoTile
                                key={p.id}
                                label={p.name}
                                stream={p.stream}
                                borderColor={p.isCameraOn ? "border-gray-600" : "border-red-500"}
                            />
                        ))}
                    </div>
                );
            case 'speaker-full':
                return (
                    <div className="w-full h-full p-6 transition-all duration-300">
                        <VideoTile
                            label={participants[0]?.name || "Speaker"}
                            stream={participants[0]?.stream}
                            borderColor={participants[0]?.isCameraOn ? "border-gray-600" : "border-red-500"}
                        />
                    </div>
                );
            case 'speaker-split':
                return (
                    <div className="flex flex-row gap-6 w-full h-full p-6 transition-all duration-300">
                        <div className="flex-1">
                            <VideoTile
                                label={participants[0]?.name || "Speaker"}
                                stream={participants[0]?.stream}
                                borderColor={participants[0]?.isCameraOn ? "border-gray-600" : "border-red-500"}
                            />
                        </div>
                        <div className="w-80 flex flex-col gap-4 overflow-hidden">
                            {/* Local video */}
                            <VideoTile
                                label="You"
                                stream={localStream}
                                isSelf={true}
                                borderColor={cameraOn ? "border-gray-600" : "border-red-500"}
                            />
                            {/* Other participants */}
                            {participants.slice(1).map((p) => (
                                <VideoTile
                                    key={p.id}
                                    label={p.name}
                                    stream={p.stream}
                                    borderColor={p.isCameraOn ? "border-gray-600" : "border-red-500"}
                                />
                            ))}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="relative w-full h-[calc(100vh-100px)] bg-black text-white transition-all duration-300">
            {getLayout()}
        </div>
    );
}