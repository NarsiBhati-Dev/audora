'use client';

import { motion } from 'framer-motion';
import VideoTile from '../video-tile';
import { DisplayParticipant } from './types';

interface GridViewProps {
  participants: DisplayParticipant[];
}

export default function GridView({ participants }: GridViewProps) {
  const total = participants.length;

  if (total === 4) {
    const participantChunks = [
      participants.slice(0, 2),
      participants.slice(2, 4),
    ];
    return (
      <div className='flex h-full w-full flex-col gap-2 p-2'>
        {participantChunks.map((chunk, index) => (
          <div key={index} className='flex flex-1 gap-2'>
            {chunk.map(p => (
              <motion.div
                key={p.id}
                className='flex-1'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <VideoTile
                  label={p.name}
                  stream={p.stream}
                  isSelf={!!p.isSelf}
                  borderColor={
                    p.isCameraOn ? 'border-gray-600' : 'border-red-500'
                  }
                  camOn={p.isCameraOn}
                  micOn={p.isMicOn}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  let gridClasses = '';
  if (total === 1) gridClasses = 'grid-cols-1';
  else if (total === 2) gridClasses = 'grid-cols-2';
  else if (total === 3) gridClasses = 'grid-cols-3';
  else gridClasses = 'grid-cols-3';

  return (
    <div className={`grid ${gridClasses} h-full w-full gap-2 p-2`}>
      {participants.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 20 + i * 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 + i * 10 }}
          transition={{ duration: 0.4 }}
        >
          <VideoTile
            label={p.name}
            stream={p.stream}
            isSelf={!!p.isSelf}
            borderColor={p.isCameraOn ? 'border-gray-600' : 'border-red-500'}
            camOn={p.isCameraOn}
            micOn={p.isMicOn}
          />
        </motion.div>
      ))}
    </div>
  );
}
