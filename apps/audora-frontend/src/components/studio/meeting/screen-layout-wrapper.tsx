'use client';
import { useState, useEffect } from 'react';
import { useMeetingParticipantStore, useMeetingStore } from '@/store/meeting-store';
import { FiMicOff, FiVideoOff } from 'react-icons/fi';
import VideoTile from './VideoTile';
import HostView from './host-view';
import { useSystemStreamStore } from '@/store/system-stream';

const getGridCols = (participantCount: number) => {
    if (participantCount <= 2) return 'grid-cols-1';
    return 'grid-cols-2';
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
    const { stream, camOn } = useSystemStreamStore();

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
            return <HostView localStream={stream} cameraOn={camOn} />;
        }

        switch (layout) {
            case 'grid':
                const totalParticipants = participants.length + 1;
                const isTwoParticipants = totalParticipants === 2;
                return (
                    <div
                        className={`${isTwoParticipants
                            ? 'flex justify-center items-center'
                            : `grid ${getGridCols(totalParticipants)} place-items-center`
                            } gap-4 w-full h-full p-6 transition-all duration-300`}
                    >
                        <VideoTile
                            label="You"
                            stream={stream}
                            isSelf={true}
                            borderColor={camOn ? "border-gray-600" : "border-red-500"}
                        />
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
                        <div className="w-md h-full flex flex-col gap-4 overflow-hidden">
                            {/* Local video */}
                            <VideoTile
                                label="You"
                                stream={stream}
                                isSelf={true}
                                borderColor={camOn ? "border-gray-600" : "border-red-500"}
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
        <div className="relative w-full h-[calc(100vh-150px)]  bg-black text-white transition-all duration-300">
            {getLayout()}
        </div>
    );
}