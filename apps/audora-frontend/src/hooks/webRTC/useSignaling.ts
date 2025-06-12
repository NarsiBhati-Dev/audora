import { useEffect, useRef, useState, useCallback } from 'react';
import { SIGNALING_URL } from '@/config';
import { Message } from '@audora/types';

export type EventCallback = (message: Message) => void;

// Singleton WebSocket + shared state
let globalSocket: WebSocket | null = null;
let activeRoomId: string | null = null;
let activeConnections = 0;

interface Signaling {
  sendMessage: (message: Message) => void;
  socket: WebSocket | null;
  reconnect: () => void;
  status: 'idle' | 'connecting' | 'connected' | 'disconnected';
}

interface SignalingProps {
  studioSlug: string;
  token: string;
  onMessage?: EventCallback;
  onOpen?: () => void;
  onClose?: () => void;
}

export const useSignaling = ({
  studioSlug,
  token,
  onMessage,
  onOpen,
  onClose,
}: SignalingProps): Signaling => {
  const socketRef = useRef<WebSocket | null>(null);
  const connectingRef = useRef(false);
  const retryCount = useRef(0);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closedByClient = useRef(false);
  const MAX_RETRIES = 3;
  const componentMountedRef = useRef(true);

  const [status, setStatus] = useState<
    'idle' | 'connecting' | 'connected' | 'disconnected'
  >('idle');

  // Keep handlers fresh
  const onMessageRef = useRef(onMessage);
  const onOpenRef = useRef(onOpen);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onMessageRef.current = onMessage;
    onOpenRef.current = onOpen;
    onCloseRef.current = onClose;
  }, [onMessage, onOpen, onClose]);

  const sendMessage = useCallback((message: Message) => {
    const socket = socketRef.current || globalSocket;
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('Tried to send message when socket is not open:', message);
    }
  }, []);

  const connectWebSocket = useCallback(() => {
    if (!token || connectingRef.current) return;
    if (retryCount.current >= MAX_RETRIES) {
      console.error(`Failed to connect after ${MAX_RETRIES} attempts.`);
      return;
    }

    if (
      globalSocket &&
      globalSocket.readyState === WebSocket.OPEN &&
      activeRoomId === studioSlug
    ) {
      console.log('Reusing existing WebSocket connection');
      socketRef.current = globalSocket;
      activeConnections++;
      setStatus('connected');
      onOpenRef.current?.();
      return;
    }

    // Disconnect old socket if it's from a different room
    if (
      globalSocket &&
      (globalSocket.readyState === WebSocket.OPEN ||
        globalSocket.readyState === WebSocket.CONNECTING) &&
      activeRoomId !== studioSlug
    ) {
      globalSocket.close();
      globalSocket = null;
      activeRoomId = null;
    }

    connectingRef.current = true;
    setStatus('connecting');

    try {
      const wsURL = `${SIGNALING_URL}?token=${encodeURIComponent(token)}`;
      const socket = new WebSocket(wsURL);
      socketRef.current = socket;
      globalSocket = socket;
      activeConnections++;
      closedByClient.current = false;

      socket.onopen = () => {
        console.log('WebSocket connected successfully');
        connectingRef.current = false;
        retryCount.current = 0;
        activeRoomId = studioSlug;
        setStatus('connected');
        socket.send(JSON.stringify({ type: 'user:join', room: studioSlug }));
        onOpenRef.current?.();
      };

      socket.onmessage = event => {
        try {
          const message: Message = JSON.parse(event.data as string);
          onMessageRef.current?.(message);
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };

      socket.onclose = event => {
        console.log('WebSocket disconnected', event.code, event.reason);
        connectingRef.current = false;
        setStatus('disconnected');
        onCloseRef.current?.();

        if (globalSocket === socket) {
          globalSocket = null;
          activeRoomId = null;
        }

        if (
          event.code === 1006 &&
          componentMountedRef.current &&
          !closedByClient.current
        ) {
          retryCount.current++;
          const delay = Math.min(
            1000 * Math.pow(2, retryCount.current - 1),
            10000,
          );
          console.log(`Retrying WebSocket connection in ${delay}ms...`);
          retryTimeoutRef.current = setTimeout(connectWebSocket, delay);
        }
      };

      socket.onerror = err => {
        console.error('WebSocket error:', err);
        connectingRef.current = false;
        setStatus('disconnected');
      };
    } catch (err) {
      console.error('Failed to create WebSocket:', err);
      connectingRef.current = false;
      retryCount.current++;
      setStatus('disconnected');
    }
  }, [token, studioSlug]);

  useEffect(() => {
    componentMountedRef.current = true;

    if (!token) {
      console.error('No token provided. WebSocket connection aborted.');
      return;
    }

    connectWebSocket();

    return () => {
      componentMountedRef.current = false;
      activeConnections--;
      closedByClient.current = true;

      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }

      if (activeConnections <= 0) {
        activeConnections = 0;
        if (globalSocket?.readyState === WebSocket.OPEN) {
          globalSocket.send(
            JSON.stringify({ type: 'user:leave', room: studioSlug }),
          );
          globalSocket.close();
        }

        globalSocket = null;
        activeRoomId = null;
      }

      socketRef.current = null;
    };
  }, [connectWebSocket, token, studioSlug]);

  return {
    sendMessage,
    socket: socketRef.current,
    reconnect: connectWebSocket,
    status,
  };
};
