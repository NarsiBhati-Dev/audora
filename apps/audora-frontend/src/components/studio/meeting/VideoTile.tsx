'use client';

import { useEffect, useRef } from 'react';
import { useMeetingStore } from '@/store/meeting-store';
import { CameraOffIcon, MicrophoneOffIcon } from '@/data/icons';

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
  const { fitMode } = useMeetingStore();
  // const { camOn, micOn } = useSystemStreamStore();

  useEffect(() => {
    if (videoRef.current && stream && camOn) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, camOn]);

  const isFillMode = fitMode === 'fill';

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl border-2 border-transparent ${borderColor} bg-dashboard-bg hover:border-primary-500 w-full transition-all duration-300`}
      style={{
        height: isFillMode ? '100%' : 'auto',
        aspectRatio: isFillMode ? undefined : '16 / 9',
      }}
    >
      {camOn && stream ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={`bg-dashboard-bg-darkest overflow-hidden rounded-xl transition-all duration-300 ${
            isSelf ? 'scale-x-[-1]' : ''
          } ${isFillMode ? 'h-full w-full object-cover' : 'max-h-full max-w-full object-contain'}`}
          style={{
            display: 'block',
            margin: isFillMode ? undefined : 'auto',
          }}
        />
      ) : (
        <div className='bg-dashboard-bg-darkest flex h-full w-full flex-col items-center justify-center text-white'>
          <CameraOffIcon className='mb-2 h-10 w-10 text-red-500' />
          <span className='text-sm'>Camera is off</span>
        </div>
      )}

      {/* Bottom-left label */}
      <div className='absolute bottom-2 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm'>
        {label}
      </div>

      {/* Top-right mic off badge */}
      {!micOn && (
        <div className='absolute right-4 bottom-4 text-white'>
          <MicrophoneOffIcon className='h-5 w-5' />
        </div>
      )}
    </div>
  );
}
