import { Message } from '@audora/types';
import { create } from 'zustand';

interface SignalStore {
  socket: WebSocket | null;
  sendMessage: (message: Message) => void;
}

export const useSignalStore = create<SignalStore>(() => ({
  socket: null,
  sendMessage: message => {
    const socket = useSignalStore.getState().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('Socket is not open');
    }
  },
}));
