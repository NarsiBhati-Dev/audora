import { create } from 'zustand';

interface MeetingStartStore {
  isMeetingStarted: boolean;
  setIsMeetingStarted: (isMeetingStarted: boolean) => void;
}

export const useMeetingStartStore = create<MeetingStartStore>(set => ({
  isMeetingStarted: false,
  setIsMeetingStarted: isMeetingStarted => set({ isMeetingStarted }),
}));
