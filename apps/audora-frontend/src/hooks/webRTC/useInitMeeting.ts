import { useEffect } from 'react';
import { useMediaDevices } from '@/hooks/useMediaDevices';
import { useSystemStreamStore } from '@/store/system-stream';
import { useMeetingStartStore } from '@/store/meeting-start-store';
import { useSignaling } from '@/hooks/webRTC/useSignaling';
import { useSignalStore } from '@/store/signal-store';
import { useMeetingParticipantStore } from '@/store/meeting-participant-store';
import onMessage from '@/utils/onMessage';
import { Message } from '@audora/types';

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
    // setVideoDeviceId,
    audioInputId,
    // setAudioInputId,
    audioOutputId,
    // setAudioOutputId,
    cameraOn,
    micOn,
    loading,
    error,
  } = useMediaDevices();

  // Setup signaling only if token exists
  const { socket, sendMessage } = useSignaling({
    studioSlug,
    token: token || '',
    onMessage: (message: Message) => onMessage(message, sendMessage, selfId),
    onClose: () => setIsMeetingStarted(false),
  });

  useEffect(() => {
    if (socket) {
      useSignalStore.setState({ socket, sendMessage });
    }
  }, [socket, sendMessage]);

  useEffect(() => {
    if (!stream) return;

    // Local device settings (no functions)
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

    // Self participant setup
    useMeetingParticipantStore.getState().updateSelfStream(stream);
    useMeetingParticipantStore.getState().updateSelfStatus(micOn, cameraOn);
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
