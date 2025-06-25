'use client';

import { useStudioSettingsStore } from '@/modules/studio/store/studio-settings-store';
import { Studio } from '@audora/types';
import React, { useEffect } from 'react';

interface StudioSettingsProviderProps {
  studio: Studio;
  children: React.ReactNode;
}

const StudioSettingsProvider = ({ studio, children }: StudioSettingsProviderProps) => {
  const { setAllSettings } = useStudioSettingsStore();

  useEffect(() => {
    setAllSettings({
      studioSetting: {
        studioSlug: studio.studioSlug,
        studioName: studio.studioName,

        enableLobby: studio.enableLobby,
        language: studio.language,
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

export default StudioSettingsProvider;
