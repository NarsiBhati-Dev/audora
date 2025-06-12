'use client';

import { useEffect, useState } from 'react';
import { useMediaDevices } from '@/hooks/useMediaDevices';
import { useSystemStreamStore } from '@/store/system-stream';
import GuestJoinView from './guest-join-view';
import HostStudioView from './host-studio-view';
// import { useSignaling } from '@/hooks/webRTC/useSignaling';

interface StudioRoleViewProps {
  isGuestJoining: boolean;
  isHost: boolean;
  hostName: string | undefined;
  isDesktop: boolean;
  isMeetingStarted: boolean;
  studioSlug: string;
}

const StudioRoleView = ({
  isGuestJoining,
  isHost,
  hostName,
  isDesktop,
  isMeetingStarted,
  // studioSlug,
}: StudioRoleViewProps) => {
  const [token, setToken] = useState<string | null>(null);
  const { setAllSettings } = useSystemStreamStore();
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
    stopCamera,
    stopMic,
    loading,
    error,
  } = useMediaDevices();

  useEffect(() => {
    setAllSettings({
      stream: stream,
      micOn: micOn,
      camOn: cameraOn,
      cameras: cameras,
      microphones: microphones,
      speakers: speakers,
      videoDeviceId: videoDeviceId,
      audioInputId: audioInputId,
      audioOutputId: audioOutputId,
      setVideoDeviceId: setVideoDeviceId,
      setAudioInputId: setAudioInputId,
      setAudioOutputId: setAudioOutputId,
      setMicToggle: toggleMic,
      setCamToggle: toggleCamera,
      setStopCam: stopCamera,
      setStopMic: stopMic,
      loading: loading,
      error: error,
    });
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
  ]);

  useEffect(() => {
    const token = localStorage.getItem('studio-token');
    setToken(token);
  }, []);

  if (!token) return null;

  // const { sendMessage, socket, status } = useSignaling({
  //   studioSlug,
  //   token: token,
  // });

  if (isGuestJoining)
    return (
      <GuestJoinView
        isMeetingStarted={isMeetingStarted}
        isDesktop={isDesktop}
      />
    );

  if (isHost)
    return (
      <HostStudioView
        hostName={hostName}
        isDesktop={isDesktop}
        isMeetingStarted={isMeetingStarted}
      />
    );

  return null;
};

export default StudioRoleView;
