'use client';

import { useEffect, useRef } from 'react';
import { useLayoutStore } from '@/store/layout-store';
import { CameraOffIcon, MicrophoneOffIcon } from '@/data/icons';
import { motion } from 'framer-motion';

type Props = {
  label: string;
  stream: MediaStream | null | undefined;
  borderColor?: string;
  isSelf?: boolean;
  camOn?: boolean;
  micOn?: boolean;
};

export default function VideoTile({
  label,
  stream,
  borderColor = 'border-gray-600',
  isSelf = false,
  camOn,
  micOn,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { fitMode } = useLayoutStore();
  const isFillMode = fitMode === 'fill';

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`relative flex items-center justify-center overflow-hidden rounded-lg border-2 ${borderColor} bg-dashboard-bg h-full w-full transition-all duration-300`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted={isSelf}
        playsInline
        className={`bg-dashboard-bg-darkest transition-all duration-300 ${isSelf ? 'scale-x-[-1]' : ''} ${isFillMode ? 'h-full w-full object-cover' : 'h-full w-full object-contain'} ${camOn ? 'opacity-100' : 'opacity-0'} `}
      />

      {!camOn && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className='absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 text-white'
        >
          <div className='flex flex-col items-center space-y-4'>
            <CameraOffIcon className='h-10 w-10 text-red-500 drop-shadow-md' />

            <div className='flex items-center space-x-1.5 rounded-full bg-red-500/20 px-3 py-1.5 backdrop-blur-sm'>
              <div className='h-2 w-2 animate-pulse rounded-full bg-red-500'></div>
              <span className='text-xs font-medium text-red-400'>
                Camera Off
              </span>
            </div>
          </div>
        </motion.div>
      )}

      <div className='absolute bottom-2 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm'>
        {label}
      </div>

      {!micOn && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className='absolute right-4 bottom-4 text-white'
        >
          <MicrophoneOffIcon className='h-5 w-5' />
        </motion.div>
      )}
    </motion.div>
  );
}
