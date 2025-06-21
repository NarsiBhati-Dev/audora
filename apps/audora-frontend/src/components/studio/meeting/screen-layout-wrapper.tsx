'use client';

import { useState, useEffect } from 'react';
import { useLayoutStore } from '@/store/layout-store';
import { useMeetingParticipantStore } from '@/modules/webrtc/store/meeting-participant-store';
import HostView from '@/components/studio/meeting/host-view';
import { useSystemStreamStore } from '@/modules/webrtc/store/system-stream';
import { DisplayParticipant } from './layouts/types';
import GridView from './layouts/GridView';
import SpeakerSplitView from './layouts/SpeakerSplitView';

export default function ScreenLayoutWrapper({ isGuest }: { isGuest: boolean }) {
  const { layout } = useLayoutStore();
  const { participants = [] } = useMeetingParticipantStore();
  const [isLoading, setIsLoading] = useState(true);
  const { stream, camOn, micOn } = useSystemStreamStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [participants]);

  if (isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-white' />
      </div>
    );
  }

  if (!participants.length && !isGuest) {
    return <HostView localStream={stream} cameraOn={camOn} micOn={micOn} />;
  }

  const selfParticipant: DisplayParticipant = {
    id: 'self',
    socketId: 'self',
    name: 'You',
    stream,
    isCameraOn: camOn,
    isMicOn: micOn,
    isSelf: true,
  };

  const getLayout = () => {
    switch (layout) {
      case 'grid':
        const allParticipants: DisplayParticipant[] = [
          selfParticipant,
          ...participants,
        ];
        return <GridView participants={allParticipants} />;

      // case 'speaker-full':
      //   const speaker = (participants.length > 0 ? participants[0] : selfParticipant) as DisplayParticipant;
      //   return <SpeakerFullView speaker={speaker} />;

      case 'speaker-split':
        const mainSpeaker = (
          participants.length > 0 ? participants[0] : selfParticipant
        ) as DisplayParticipant;
        const otherParticipants =
          mainSpeaker.id === 'self'
            ? participants
            : [
                selfParticipant,
                ...participants.filter(p => p.id !== mainSpeaker.id),
              ];
        return (
          <SpeakerSplitView
            mainSpeaker={mainSpeaker}
            otherParticipants={otherParticipants}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='relative h-full w-full bg-black text-white transition-all duration-300'>
      {getLayout()}
    </div>
  );
}
