'use client';

import { useVideoInfo } from '@/hooks/useVideoInfo';
import Spinner1 from '../../loaders/spinner1';
import DropdownSelect from './dropdown-select';
import {
  CameraIcon,
  CameraOffIcon,
  MicrophoneIcon,
  MicrophoneOffIcon,
} from '@/data/icons';
import { useSystemStreamStore } from '@/modules/webrtc/store/system-stream';

export default function MediaSetupScreen() {
  const {
    stream,
    micOn,
    camOn,
    loading,
    error,
    cameras,
    videoDeviceId,
    setVideoDeviceId,
    microphones,
    audioInputId,
    setAudioInputId,
    speakers,
    audioOutputId,
    setAudioOutputId,
    setMicToggle,
    setCamToggle,
  } = useSystemStreamStore();

  const videoInfo = useVideoInfo(stream);

  return (
    <div className='flex w-full items-center justify-center px-4'>
      <div className='w-full max-w-sm space-y-4 rounded-xl bg-zinc-900 p-4 text-white sm:max-w-md'>
        <>
          {loading ? (
            <div className='flex flex-col items-center justify-center rounded-xl bg-zinc-700 py-20'>
              <Spinner1 />
              <p className='mt-4 text-sm text-white'>Setting up your devices</p>
            </div>
          ) : (
            <div className='relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-700'>
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
              {!camOn && (
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
                  onClick={() => setMicToggle(true)}
                  className={`rounded-2xl bg-zinc-700/30 p-2 text-sm font-semibold transition duration-200 hover:bg-zinc-700/70 ${micOn ? 'text-white' : 'text-red-500'}`}
                >
                  {micOn ? (
                    <MicrophoneIcon className='h-6 w-6' />
                  ) : (
                    <MicrophoneOffIcon className='h-6 w-6 text-red-500' />
                  )}
                </button>

                <button
                  onClick={() => setCamToggle(true)}
                  className={`rounded-2xl bg-zinc-700/30 p-2 text-sm font-semibold transition duration-200 hover:bg-zinc-700/70 ${camOn ? 'text-white' : 'text-red-500'}`}
                >
                  {camOn ? (
                    <CameraIcon className='h-6 w-6' />
                  ) : (
                    <CameraOffIcon className='h-6 w-6 text-red-500' />
                  )}
                </button>
              </div>
              {error && (
                <p className='absolute inset-0 flex items-center justify-center text-sm text-zinc-500'>
                  Allow permissions to join the studio
                </p>
              )}
            </div>
          )}
          <div className='flex flex-col gap-2'>
            <DropdownSelect
              options={cameras.map(c => ({
                label: c.label,
                value: c.deviceId,
              }))}
              iconType='camera'
              value={videoDeviceId}
              onChange={setVideoDeviceId}
              disabled={!camOn}
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
      </div>
    </div>
  );
}
