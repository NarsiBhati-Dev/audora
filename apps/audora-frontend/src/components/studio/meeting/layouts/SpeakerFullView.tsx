'use client';

import { motion } from 'framer-motion';
import VideoTile from '../video-tile';
import { DisplayParticipant } from './types';

interface SpeakerFullViewProps {
    speaker: DisplayParticipant;
}

export default function SpeakerFullView({ speaker }: SpeakerFullViewProps) {
    return (
        <motion.div
            className="h-full w-full p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <VideoTile
                label={speaker.name}
                stream={speaker.stream}
                borderColor={speaker.isCameraOn ? 'border-gray-600' : 'border-red-500'}
                camOn={speaker.isCameraOn}
                micOn={speaker.isMicOn}
                isSelf={!!speaker.isSelf}
            />
        </motion.div>
    );
} 