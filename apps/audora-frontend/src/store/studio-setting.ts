import { create } from 'zustand';

interface StudioSetting {
  name: string;
  enableLobby: boolean;
  language: string;
}

interface StudioSettingStore {
  studioSetting: StudioSetting;
  setStudioSetting: (studioSetting: StudioSetting) => void;
}

export const useStudioSettingStore = create<StudioSettingStore>(set => ({
  studioSetting: {
    name: '',
    enableLobby: false,
    language: 'English',
  },
  setStudioSetting: studioSetting => set({ studioSetting }),
}));

export type RecordingType = 'AUDIO' | 'VIDEO_AUDIO';
export type AudioSampleRate = 'KHZ_44_1' | 'KHZ_48_0';
export type VideoQuality = 'STANDARD' | 'HIGH';

export interface StudioRecordingSetting {
  recordingType: RecordingType;
  audioSampleRate: AudioSampleRate;
  videoQuality: VideoQuality;
  noiseReduction: boolean;
  countdownBeforeRecording: boolean;
  autoStartOnGuestJoin: boolean;
  pauseUploads: boolean;
}

interface StudioRecordingSettingStore {
  studioRecordingSetting: StudioRecordingSetting;
  setStudioRecordingSetting: (settings: StudioRecordingSetting) => void;
}

export const useStudioRecordingSettingStore =
  create<StudioRecordingSettingStore>(set => ({
    studioRecordingSetting: {
      recordingType: 'AUDIO',
      audioSampleRate: 'KHZ_44_1',
      videoQuality: 'STANDARD',
      noiseReduction: false,
      countdownBeforeRecording: false,
      autoStartOnGuestJoin: false,
      pauseUploads: false,
    },
    setStudioRecordingSetting: settings =>
      set({ studioRecordingSetting: settings }),
  }));
