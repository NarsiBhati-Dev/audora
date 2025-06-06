import { useState, useEffect, useCallback } from 'react';

interface SignalingMessage {
  type:
    | 'offer'
    | 'answer'
    | 'ice-candidate'
    | 'join'
    | 'leave'
    | 'status-update';
  peerId: string;
  data: any;
}

export const useSignaling = (roomId: string, userId: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    // Replace with your signaling server URL
    const ws = new WebSocket(
      `wss://your-signaling-server.com/ws?room=${roomId}&userId=${userId}`,
    );

    ws.onopen = () => {
      setIsConnected(true);
      // Send join message
      ws.send(
        JSON.stringify({
          type: 'join',
          peerId: userId,
          data: { roomId },
        }),
      );
    };

    ws.onclose = () => {
      setIsConnected(false);
      // Attempt to reconnect after a delay
      setTimeout(connect, 3000);
    };

    ws.onerror = error => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [roomId, userId]);

  useEffect(() => {
    const cleanup = connect();
    return cleanup;
  }, [connect]);

  const sendMessage = useCallback(
    (message: SignalingMessage) => {
      if (socket && isConnected) {
        socket.send(JSON.stringify(message));
      }
    },
    [socket, isConnected],
  );

  const onMessage = useCallback(
    (callback: (message: SignalingMessage) => void) => {
      if (socket) {
        socket.onmessage = event => {
          try {
            const message = JSON.parse(event.data) as SignalingMessage;
            callback(message);
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        };
      }
    },
    [socket],
  );

  return {
    isConnected,
    sendMessage,
    onMessage,
  };
};
