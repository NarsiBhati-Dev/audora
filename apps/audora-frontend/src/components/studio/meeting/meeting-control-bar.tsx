'use client';

import {
  Volume2,
  PhoneOff,
} from 'lucide-react';
import { useState } from 'react';
import MeetingControllerButton from './meeting-controller-button';
import { useSignalStore } from '@/store/webrtc/signal-store';
import RecordingButton from './recording/recording-button';

import {
  CameraIcon,
  MicrophoneIcon,
  MicrophoneOffIcon,
  CameraOffIcon,
} from '@/data/icons';
import LayoutControlPanel from './layout-control-panel';
import { useRouter } from 'next/navigation';
import { useSystemStreamStore } from '@/store/webrtc/system-stream';
import LeaveConfirmModal from './leave-confirm-modal';
import { useMeetingParticipantStore } from '@/store/webrtc/meeting-participant-store';

const MeetingControlBar = ({ isGuest = false }) => {
  const router = useRouter();
  const { micOn, camOn, setMicToggle, setCamToggle } = useSystemStreamStore();
  const [isLeaving, setIsLeaving] = useState(false);

  const handleLeave = () => {
    // Stop all media tracks
    const tracks = document.querySelectorAll('video, audio');
    tracks.forEach(track => {
      if (track instanceof HTMLMediaElement) {
        track.srcObject = null;
      }
    });

    router.push('/');
  };

  const handleEndMeeting = () => {
    // Stop all media tracks
    const tracks = document.querySelectorAll('video, audio');
    tracks.forEach(track => {
      if (track instanceof HTMLMediaElement) {
        track.srcObject = null;
      }
    });

    useSignalStore.getState().sendMessage({
      type: 'meeting:end',
      data: {
        socketId: useMeetingParticipantStore.getState().self?.socketId || '',
      },
    });

    router.push('/dashboard');
  };

  const handleMicToggle = () => {
    const selfSocketId =
      useMeetingParticipantStore.getState().self?.socketId || '';

    if (selfSocketId !== '') {
      useSignalStore.getState().sendMessage({
        type: 'mic:toggle',
        data: { micOn: !micOn, socketId: selfSocketId },
      });
      setMicToggle(!micOn);
    }
  };

  const handleCamToggle = () => {
    const selfSocketId =
      useMeetingParticipantStore.getState().self?.socketId || '';

    if (selfSocketId !== '') {
      useSignalStore.getState().sendMessage({
        type: 'cam:toggle',
        data: { camOn: !camOn, socketId: selfSocketId },
      });
      setCamToggle(!camOn);
    }
  };

  return (
    <div className='fixed right-0 bottom-1.5 left-0 mx-auto flex w-full max-w-4xl items-center justify-between'>
      <div className='flex w-full items-center justify-center gap-6'>
        <RecordingButton isGuest={isGuest} />
        <MeetingControllerButton
          label='Mic'
          onToggle={handleMicToggle}
          icon={
            micOn ? (
              <MicrophoneIcon className='h-5 w-5' />
            ) : (
              <MicrophoneOffIcon className='h-5 w-5 text-red-500' />
            )
          }
          isOn={micOn}
          type='microphone'
        />
        <MeetingControllerButton
          label='Cam'
          onToggle={handleCamToggle}
          icon={
            camOn ? (
              <CameraIcon className='h-5 w-5' />
            ) : (
              <CameraOffIcon className='h-5 w-5 text-red-500' />
            )
          }
          isOn={camOn}
          type='camera'
        />
        <MeetingControllerButton
          label='Speaker'
          onToggle={() => { }}
          icon={<Volume2 className='h-5 w-5' />}
          isOn
        />

        <MeetingControllerButton
          label='Leave'
          onToggle={() => setIsLeaving(true)}
          icon={<PhoneOff className='h-5 w-5 text-red-500' />}
        />
        {isLeaving && (
          <LeaveConfirmModal
            isHost={!isGuest}
            onCancel={() => setIsLeaving(false)}
            onLeave={handleLeave}
            onEndMeeting={handleEndMeeting}
          />
        )}
      </div>
      <div className='relative flex items-center'>
        <LayoutControlPanel />
      </div>
    </div>
  );
};

export default MeetingControlBar;
