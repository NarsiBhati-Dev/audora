import { useState, useCallback, useEffect } from 'react';
import { SIGNALING_URL } from '@/config';
import { Message } from '@audora/types';

export const useSignaling = (roomId: string, userId: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    const ws = new WebSocket(
      `${SIGNALING_URL}?roomId=${roomId}&userId=${userId}`,
    );

    ws.onopen = () => {
      setIsConnected(true);
      console.log('Connected to signaling server');
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log('Disconnected from signaling server');
    };

    ws.onerror = error => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [roomId, userId]);

  const sendMessage = useCallback(
    (message: Message) => {
      if (socket && isConnected) {
        socket.send(JSON.stringify(message));
      } else {
        console.error('Cannot send message: WebSocket is not connected');
      }
    },
    [socket, isConnected],
  );

  const onMessage = useCallback(
    (callback: (message: Message) => void) => {
      if (socket) {
        socket.onmessage = event => {
          try {
            const message = JSON.parse(event.data) as Message;
            callback(message);
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        };
      }
    },
    [socket],
  );

  useEffect(() => {
    const cleanup = connect();
    return () => {
      cleanup();
    };
  }, [connect]);

  return {
    isConnected,
    sendMessage,
    onMessage,
  };
};
