'use client';

import { useStudioSettingsStore } from '@/store/studio-setting-store';
import { Studio } from '@audora/types';
import React, { useEffect } from 'react';

interface StudioProviderProps {
  studio: Studio;
  children: React.ReactNode;
}

const StudioProvider = ({ studio, children }: StudioProviderProps) => {
  const { setAllSettings } = useStudioSettingsStore();

  useEffect(() => {
    setAllSettings({
      studioSetting: {
        studioId: studio.id,
        language: studio.language,
        enableLobby: studio.enableLobby,
        name: studio.studioName,
      },
      studioRecordingSetting: {
        recordingType: studio.recordingType,
        audioSampleRate: studio.audioSampleRate,
        videoQuality: studio.videoQuality,
        noiseReduction: studio.noiseReduction,
        countdownBeforeRecording: studio.countdownBeforeRecording,
        autoStartOnGuestJoin: studio.autoStartOnGuestJoin,
        pauseUploads: studio.pauseUploads,
      },
    });
  }, [studio, setAllSettings]);

  return <>{children}</>;
};

export default StudioProvider;
