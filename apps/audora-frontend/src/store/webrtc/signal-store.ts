import { Message } from '@audora/types';
import { create } from 'zustand';

interface SignalStore {
  socket: WebSocket | null;
  sendMessage: (message: Message) => void;
  isReady: boolean;
}

export const useSignalStore = create<SignalStore>((set, get) => ({
  socket: null,
  isReady: false,
  sendMessage: message => {
    const { socket, isReady } = get();
    if (socket && socket.readyState === WebSocket.OPEN && isReady) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('Socket is not ready or not open');
    }
  },
}));
