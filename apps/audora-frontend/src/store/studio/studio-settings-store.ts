import { create } from 'zustand';

export type RecordingType = 'AUDIO' | 'VIDEO_AUDIO';
export type AudioSampleRate = 'KHZ_44_1' | 'KHZ_48_0';
export type VideoQuality = 'STANDARD' | 'HIGH';

export interface StudioSettings {
  studioSlug: string;
  studioName: string;
  enableLobby: boolean;
  language: string;
  enableCaptions: boolean;
  studioFixedToken?: string;
}

export interface StudioRecordingSetting {
  recordingType: RecordingType;
  audioSampleRate: AudioSampleRate;
  videoQuality: VideoQuality;
  noiseReduction: boolean;
  countdownBeforeRecording: boolean;
  autoStartOnGuestJoin: boolean;
  pauseUploads: boolean;
}

interface StudioSettingsStore {
  studioSetting: StudioSettings;
  studioRecordingSetting: StudioRecordingSetting;
  setStudioSetting: (setting: Partial<StudioSettings>) => void;
  setStudioRecordingSetting: (setting: Partial<StudioRecordingSetting>) => void;
  setAllSettings: (data: {
    studioSetting: StudioSettings;
    studioRecordingSetting: StudioRecordingSetting;
  }) => void;
}

export const useStudioSettingsStore = create<StudioSettingsStore>(set => ({
  studioSetting: {
    studioSlug: '',
    studioName: '',
    enableLobby: false,
    language: 'English',
    enableCaptions: false,
    studioFixedToken: undefined,
  },
  studioRecordingSetting: {
    recordingType: 'AUDIO',
    audioSampleRate: 'KHZ_44_1',
    videoQuality: 'STANDARD',
    noiseReduction: false,
    countdownBeforeRecording: false,
    autoStartOnGuestJoin: false,
    pauseUploads: false,
  },
  setStudioSetting: setting =>
    set(state => ({
      studioSetting: {
        ...state.studioSetting,
        ...setting,
      },
    })),
  setStudioRecordingSetting: setting =>
    set(state => ({
      studioRecordingSetting: {
        ...state.studioRecordingSetting,
        ...setting,
      },
    })),
  setAllSettings: data => set({ ...data }),
}));
