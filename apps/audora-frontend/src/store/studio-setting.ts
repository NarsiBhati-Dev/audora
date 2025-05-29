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
