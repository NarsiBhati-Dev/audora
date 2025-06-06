'use client';

import { useEffect } from 'react';
import { useStudioSettingsStore } from '@/store/studio-setting-store';
import { getStudioNameFromSlug } from '@/lib/studio/getStudioNameFromSlug';
import {
  renderGuestJoining,
  renderGuestLanding,
  renderHostView,
} from './render-view';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useMeetingStartStore } from '@/store/meeting-start-store';
import { useSystemStreamStore } from '@/store/system-stream';
import { useMediaDevices } from '@/hooks/useMediaDevices';
// import { getGuestUserId } from '@/lib/studio/get-userId';

interface StudioPageClientProps {
  studio: string;
  isHost: boolean;
  userId: string | null;
  isGuestLanding: boolean;
  isGuestJoining: boolean;
  hostName: string | undefined;
}

const StudioPageClient = ({
  studio,
  isHost,
  // userId,
  isGuestLanding,
  isGuestJoining,
  hostName,
}: StudioPageClientProps) => {
  const { setStudioSetting } = useStudioSettingsStore();
  const isDesktop = useIsDesktop();
  const { isMeetingStarted, setIsMeetingStarted } = useMeetingStartStore()

  // const effectiveUserId = userId || (!isHost ? getGuestUserId() : null);

  useEffect(() => {
    if (studio) {
      setStudioSetting({
        studioId: studio,
        name: getStudioNameFromSlug(studio),
      });
    }

    return () => {
      setIsMeetingStarted(false);
    };
  }, [studio, setStudioSetting]);

  // If welcome token is present, show welcome screen
  if (isGuestLanding) return renderGuestLanding();


  const { setAllSettings } = useSystemStreamStore();
  const { cameras,
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
    error, } = useMediaDevices();

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
  }, [stream, micOn, cameraOn, cameras, microphones, speakers, videoDeviceId, audioInputId, audioOutputId, loading, error]);

  // If guest token is present, show join as guest screen
  if (isGuestJoining) return renderGuestJoining(isMeetingStarted);

  // If host token is present, show host view
  if (isHost) return renderHostView(hostName, isDesktop, isMeetingStarted);

  return null;
};

export default StudioPageClient;
