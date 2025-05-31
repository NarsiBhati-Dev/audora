'use client';

import { useMediaDevices } from '@/hooks/useMediaDevices';
import { useVideoInfo } from '@/hooks/useVideoInfo';
import Spinner1 from '../loaders/spinner1';
import DropdownSelect from './dropdown-select';
import {
  CameraIcon,
  CameraOffIcon,
  MicrophoneIcon,
  MicOffIcon,
} from '@/data/icons';

export default function MediaSetupScreen() {
  const {
    cameras,
    microphones,
    speakers,
    stream,
    videoDeviceId,
    setVideoDeviceId,
    audioInputId,
    setAudioInputId,
    audioOutputId,
    setAudioOutputId,
    cameraOn,
    micOn,
    toggleCamera,
    toggleMic,
    loading,
    error,
  } = useMediaDevices();

  const videoInfo = useVideoInfo(stream);

  return (
    <div className='mt-20 flex h-full w-[22rem] items-center justify-center'>
      <div className='w-full max-w-md space-y-4 rounded-xl bg-zinc-900 p-4 text-white'>
        {loading ? (
          <div className='flex flex-col items-center justify-center py-20'>
            <Spinner1 />
            <p className='mt-4 text-sm text-zinc-400'>
              Setting up your devices
            </p>
          </div>
        ) : (
          <>
            <div className='relative h-48 w-80 overflow-hidden rounded-xl bg-zinc-700'>
              {stream && (
                <video
                  className='h-full w-full object-cover'
                  autoPlay
                  muted
                  playsInline
                  style={{ transform: 'scaleX(-1)' }}
                  ref={video => {
                    if (video && stream) {
                      video.srcObject = stream;
                    }
                  }}
                />
              )}
              {!cameraOn && (
                <div className='absolute inset-0 flex items-center justify-center bg-zinc-800'>
                  <p className='text-sm text-zinc-400'>Camera off</p>
                </div>
              )}
              {videoInfo.height > 0 && (
                <div className='absolute top-2 left-2 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-xs font-bold text-white'>
                  {videoInfo.width}x{videoInfo.height} / {videoInfo.frameRate}
                  fps
                </div>
              )}

              <div className='absolute right-0 bottom-2 left-0 mt-2 flex justify-center gap-4'>
                <button
                  onClick={toggleMic}
                  className={`rounded-2xl bg-zinc-700/70 p-2 text-sm font-semibold transition duration-200 hover:bg-zinc-700/40 ${micOn ? 'text-white' : 'text-red-500'}`}
                >
                  {micOn ? (
                    <MicrophoneIcon className='h-6 w-6' />
                  ) : (
                    <MicOffIcon className='h-6 w-6 text-red-500' />
                  )}
                </button>

                <button
                  onClick={toggleCamera}
                  className={`rounded-2xl bg-zinc-700/70 p-2 text-sm font-semibold transition duration-200 hover:bg-zinc-700/40 ${cameraOn ? 'text-white' : 'text-red-500'}`}
                >
                  {cameraOn ? (
                    <CameraIcon className='h-6 w-6' />
                  ) : (
                    <CameraOffIcon className='h-6 w-6 text-red-500' />
                  )}
                </button>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <DropdownSelect
                options={cameras.map(c => ({
                  label: c.label,
                  value: c.deviceId,
                }))}
                iconType='camera'
                value={videoDeviceId}
                onChange={setVideoDeviceId}
                disabled={!cameraOn}
                placeholder='Select a camera'
              />
              <DropdownSelect
                options={microphones.map(m => ({
                  label: m.label,
                  value: m.deviceId,
                }))}
                iconType='mic'
                value={audioInputId}
                onChange={setAudioInputId}
                disabled={!micOn}
                placeholder='Select a microphone'
              />
              <DropdownSelect
                options={speakers.map(s => ({
                  label: s.label,
                  value: s.deviceId,
                }))}
                iconType='speaker'
                value={audioOutputId}
                onChange={setAudioOutputId}
                placeholder='Select a speaker'
              />
            </div>
          </>
        )}
        {error && <p className='text-sm text-red-400'>Error: {error}</p>}
      </div>
    </div>
  );
}
