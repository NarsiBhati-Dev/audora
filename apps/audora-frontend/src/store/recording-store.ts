import { create } from 'zustand';

interface RecordingStore {
  isRecording: boolean;
  isCountdownActive: boolean;
  countdownValue: number;
  setIsRecording: (isRecording: boolean) => void;
  startCountdown: (seconds?: number) => void;
  stopCountdown: () => void;
  onCountdownComplete: () => void;
}

export const useRecordingStore = create<RecordingStore>(set => ({
  isRecording: false,
  isCountdownActive: false,
  countdownValue: 3,
  setIsRecording: isRecording => set({ isRecording }),
  startCountdown: (seconds = 3) => {
    set({
      isCountdownActive: true,
      countdownValue: seconds,
    });
  },
  stopCountdown: () => set({ isCountdownActive: false }),
  onCountdownComplete: async () => {
    set({ isCountdownActive: false });

    try {
      set({ isRecording: true });
    } catch (error) {
      console.error('Failed to start recording after countdown:', error);
    }
  },
}));
