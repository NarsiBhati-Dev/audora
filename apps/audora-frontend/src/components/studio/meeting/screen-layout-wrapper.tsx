'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMeetingStore } from '@/store/meeting-store';
import { useMeetingParticipantStore } from '@/store/meeting-participant-store';
import VideoTile from '@/components/studio/meeting/video-tile';
import HostView from '@/components/studio/meeting/host-view';
import { useSystemStreamStore } from '@/store/system-stream';

const getGridCols = (count: number) => {
  if (count <= 2) return 'grid-cols-1';
  if (count <= 4) return 'grid-cols-2';
  return 'grid-cols-3';
};

export default function ScreenLayoutWrapper({ isGuest }: { isGuest: boolean }) {
  const { layout } = useMeetingStore();
  const { participants = [] } = useMeetingParticipantStore();
  const [isLoading, setIsLoading] = useState(true);
  const { stream, camOn, micOn } = useSystemStreamStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [participants]);

  const getLayout = () => {
    if (isLoading) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-white" />
        </div>
      );
    }

    if (!participants.length && !isGuest) {
      return <HostView localStream={stream} cameraOn={camOn} micOn={micOn} />;
    }

    const total = participants.length + 1;

    switch (layout) {
      case 'grid':
        return (
          <div
            className={`${total === 2 ? 'flex items-center justify-center' : `grid ${getGridCols(total)} place-items-center`
              } h-full w-full gap-4 p-6 transition-all duration-300`}
          >
            <motion.div
              key="self"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <VideoTile
                label="You"
                stream={stream}
                isSelf
                borderColor={camOn ? 'border-gray-600' : 'border-red-500'}
                camOn={camOn}
                micOn={micOn}
              />
            </motion.div>

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
                  borderColor={p.isCameraOn ? 'border-gray-600' : 'border-red-500'}
                  camOn={p.isCameraOn}
                  micOn={p.isMicOn}
                />
              </motion.div>
            ))}
          </div>
        );

      case 'speaker-full':
        return (
          <motion.div
            className="h-full w-full p-6 transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VideoTile
              label={participants[0]?.name || 'Speaker'}
              stream={participants[0]?.stream}
              borderColor={participants[0]?.isCameraOn ? 'border-gray-600' : 'border-red-500'}
              camOn={participants[0]?.isCameraOn}
              micOn={participants[0]?.isMicOn}
            />
          </motion.div>
        );

      case 'speaker-split':
        return (
          <div className="flex h-full w-full flex-row gap-6 p-6 transition-all duration-300">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <VideoTile
                label={participants[0]?.name || 'Speaker'}
                stream={participants[0]?.stream}
                borderColor={participants[0]?.isCameraOn ? 'border-gray-600' : 'border-red-500'}
                camOn={participants[0]?.isCameraOn}
                micOn={participants[0]?.isMicOn}
              />
            </motion.div>

            <motion.div
              className="flex h-full w-md flex-col gap-4 overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <VideoTile
                label="You"
                stream={stream}
                isSelf
                borderColor={camOn ? 'border-gray-600' : 'border-red-500'}
                camOn={camOn}
                micOn={micOn}
              />
              {participants.slice(1).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 * (i + 1) }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 * (i + 1) }}
                  transition={{ duration: 0.3 }}
                >
                  <VideoTile
                    label={p.name}
                    stream={p.stream}
                    borderColor={p.isCameraOn ? 'border-gray-600' : 'border-red-500'}
                    camOn={p.isCameraOn}
                    micOn={p.isMicOn}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="relative h-[calc(100vh-150px)] w-full bg-black text-white transition-all duration-300">
      {getLayout()}
    </div>
  );
}