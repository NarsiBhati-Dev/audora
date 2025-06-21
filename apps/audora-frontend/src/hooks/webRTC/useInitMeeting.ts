import { useEffect } from 'react';
import { useMediaDevices } from '@/hooks/useMediaDevices';
import { useSystemStreamStore } from '@/store/system-stream';
import { useMeetingStartStore } from '@/store/meeting-start-store';
import { useSignaling } from '@/hooks/webRTC/useSignaling';
import { useSignalStore } from '@/store/signal-store';
import { useMeetingParticipantStore } from '@/store/meeting-participant-store';
import onMessage from '@/utils/onMessage';
import { Message } from '@audora/types';
import { useRouter } from 'next/navigation';

interface InitMeetingArgs {
  studioSlug: string;
  token: string | null;
  selfId: string;
}

export const useInitMeeting = ({
  studioSlug,
  token,
  selfId,
}: InitMeetingArgs) => {
  const { setIsMeetingStarted } = useMeetingStartStore();
  const {
    cameras,
    microphones,
    speakers,
    stream,
    videoDeviceId,
    audioInputId,
    audioOutputId,
    cameraOn,
    micOn,
    loading,
    error,
  } = useMediaDevices();

  const router = useRouter();

  // Setup signalling only if the token exists
  const { socket, sendMessage } = useSignaling({
    studioSlug,
    token: token || '',
    onMessage: (message: Message) =>
      onMessage(message, sendMessage, selfId, router.push),
    onClose: () => setIsMeetingStarted(false),
  });

  useEffect(() => {
    if (socket) {
      useSignalStore.setState({ socket, sendMessage });
    }
  }, [socket, sendMessage]);

  useEffect(() => {
    if (!stream) return;

    // Local device settings
    useSystemStreamStore.setState({
      stream,
      micOn,
      camOn: cameraOn,
      cameras,
      microphones,
      speakers,
      videoDeviceId,
      audioInputId,
      audioOutputId,
      loading,
      error,
      selfId,
    });

    // Setup self participant
    useMeetingParticipantStore.getState().setSelf({
      id: selfId,
      socketId: '',
      name: 'You',
      stream,
      isSpeaker: false,
      isMuted: false,
      isDeafened: false,
      isCameraOn: cameraOn,
      isMicOn: micOn,
    });

    // Keep syncing if needed
    // useMeetingParticipantStore.getState().updateSelfStream(stream);
    // useMeetingParticipantStore.getState().updateSelfStatus(micOn, cameraOn);
  }, [
    stream,
    micOn,
    cameraOn,
    cameras,
    microphones,
    speakers,
    videoDeviceId,
    audioInputId,
    audioOutputId,
    loading,
    error,
    selfId,
  ]);
};
