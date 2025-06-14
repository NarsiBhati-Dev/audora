// store/system-stream.ts
import { create } from 'zustand';

interface DeviceOption {
  label: string;
  deviceId: string;
}

interface SystemStreamStore {
  selfId: string;
  stream: MediaStream | null;
  micOn: boolean;
  camOn: boolean;
  cameras: DeviceOption[];
  microphones: DeviceOption[];
  speakers: DeviceOption[];
  videoDeviceId: string;
  audioInputId: string;
  audioOutputId: string;
  loading: boolean;
  error: string | null;

  // Setters
  setSelfId: (id: string) => void;
  setSystemStream: (stream: MediaStream | null) => void;
  setMicToggle: (state: boolean) => void;
  setCamToggle: (state: boolean) => void;
  setCameras: (devices: DeviceOption[]) => void;
  setMicrophones: (devices: DeviceOption[]) => void;
  setSpeakers: (devices: DeviceOption[]) => void;
  setVideoDeviceId: (id: string) => void;
  setAudioInputId: (id: string) => void;
  setAudioOutputId: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setStopCam: () => void;
  setStopMic: () => void;
  setError: (error: string | null) => void;

  // Optional: Set all at once (e.g., from `useEffect`)
  setAllSettings: (settings: Partial<SystemStreamStore>) => void;
}

export const useSystemStreamStore = create<SystemStreamStore>(set => ({
  selfId: '',
  stream: null,
  micOn: true,
  camOn: true,
  cameras: [],
  microphones: [],
  speakers: [],
  videoDeviceId: '',
  audioInputId: '',
  audioOutputId: '',
  loading: true,
  error: null,

  setSelfId: id => set({ selfId: id }),
  setSystemStream: stream => set({ stream: stream }),
  setMicToggle: micOn => set({ micOn }),
  setCamToggle: camOn => set({ camOn }),
  setCameras: cameras => set({ cameras }),
  setMicrophones: microphones => set({ microphones }),
  setSpeakers: speakers => set({ speakers }),
  setVideoDeviceId: id => set({ videoDeviceId: id }),
  setAudioInputId: id => set({ audioInputId: id }),
  setAudioOutputId: id => set({ audioOutputId: id }),
  setLoading: loading => set({ loading }),
  setStopCam: () => set({ camOn: false }),
  setStopMic: () => set({ micOn: false }),
  setError: error => set({ error }),

  setAllSettings: settings => set(state => ({ ...state, ...settings })),
}));
