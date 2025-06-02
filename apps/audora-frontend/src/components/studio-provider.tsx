'use client';

import { useStudioSettingsStore } from '@/store/studio-setting-store';
import { Studio } from '@audora/types';
import React, { useEffect } from 'react';

interface StudioProviderProps {
  studio: Studio;
  children: React.ReactNode;
}

const StudioProvider = ({ studio, children }: StudioProviderProps) => {
  const { setAllSettings, studioSetting } = useStudioSettingsStore();

  useEffect(() => {
    console.log('Setting studio data:', studio);
    setAllSettings({
      studioSetting: {
        studioId: studio.id,
        name: studio.studioName,
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

  useEffect(() => {
    console.log('Current store state:', {
      studioSetting,
      studioRecordingSetting:
        useStudioSettingsStore.getState().studioRecordingSetting,
    });
  }, [studioSetting]);

  return <>{children}</>;
};

export default StudioProvider;
