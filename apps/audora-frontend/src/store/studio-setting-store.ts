import { create } from 'zustand';

export type RecordingType = 'AUDIO' | 'VIDEO_AUDIO';
export type AudioSampleRate = 'KHZ_44_1' | 'KHZ_48_0';
export type VideoQuality = 'STANDARD' | 'HIGH';

export interface StudioSetting {
  studioSlug: string;
  studioName: string;
  enableLobby: boolean;
  language: string;
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
  studioSetting: StudioSetting;
  studioRecordingSetting: StudioRecordingSetting;
  setStudioSetting: (setting: Partial<StudioSetting>) => void;
  setStudioRecordingSetting: (setting: Partial<StudioRecordingSetting>) => void;
  setAllSettings: (data: {
    studioSetting: StudioSetting;
    studioRecordingSetting: StudioRecordingSetting;
  }) => void;
}

export const useStudioSettingsStore = create<StudioSettingsStore>(set => ({
  studioSetting: {
    studioSlug: '',
    studioName: '',
    enableLobby: false,
    language: 'English',
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
