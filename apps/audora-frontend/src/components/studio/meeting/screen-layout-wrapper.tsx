'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useSystemStreamStore } from '@/store/system-stream';
import { useOneToOneStore } from '@/store/one-to-one-store';

import VideoTile from './video-tile';
import HostView from './host-view';

export default function ScreenLayoutWrapper({ isGuest }: { isGuest: boolean }) {
  const { stream: localStream, camOn, micOn } = useSystemStreamStore();
  const { peer } = useOneToOneStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [peer?.stream]);

  if (isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-white' />
      </div>
    );
  }

  if (!peer && !isGuest) {
    return <HostView localStream={localStream} cameraOn={camOn} micOn={micOn} />;
  }

  return (
    <div className='relative h-[calc(100vh-150px)] w-full bg-black text-white p-4'>
      <div className='flex h-full w-full gap-4'>
        {/* Guest (Left) */}
        <motion.div
          key='guest'
          className='flex h-full w-1/2 items-center justify-center'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <VideoTile
            label={peer?.name || 'Guest'}
            stream={peer?.stream}
            camOn={peer?.isCameraOn}
            micOn={peer?.isMicOn}
            borderColor={peer?.isCameraOn ? 'border-gray-600' : 'border-red-500'}
          />
        </motion.div>

        {/* Host (Right) */}
        <motion.div
          key='self'
          className='flex h-full w-1/2 items-center justify-center'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
        >
          <VideoTile
            label='You'
            stream={localStream}
            isSelf
            camOn={camOn}
            micOn={micOn}
            borderColor={camOn ? 'border-gray-600' : 'border-red-500'}
          />
        </motion.div>
      </div>
    </div>
  );
}