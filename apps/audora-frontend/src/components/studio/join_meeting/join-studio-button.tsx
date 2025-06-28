'use client';

import { useMeetingStartStore } from '@/store/meeting-start-store';
// import { useMeetingStore } from '@/store/meeting-store';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSignalStore } from '@/store/webrtc/signal-store';
import { useSystemStreamStore } from '@/store/webrtc/system-stream';

interface JoinStudioButtonProps {
  // isHost: boolean;
  name: string;
}

export function JoinStudioButton({ name }: JoinStudioButtonProps) {
  const { setIsMeetingStarted } = useMeetingStartStore();
  const { sendMessage, socket, isReady } = useSignalStore();
  const { micOn, camOn } = useSystemStreamStore();

  const [permissionState, setPermissionState] = useState<
    'loading' | 'granted' | 'prompt' | 'denied'
  >('loading');

  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    let camListener: (() => void) | null = null;
    let micListener: (() => void) | null = null;

    const checkPermissions = async () => {
      try {
        const cam = await navigator.permissions.query({
          name: 'camera' as PermissionName,
        });
        const mic = await navigator.permissions.query({
          name: 'microphone' as PermissionName,
        });

        const updateState = () => {
          if (cam.state === 'granted' && mic.state === 'granted') {
            setPermissionState('granted');
          } else if (cam.state === 'denied' || mic.state === 'denied') {
            setPermissionState('denied');
          } else {
            setPermissionState('prompt');
          }
        };

        // Initial check
        updateState();

        // Listen for changes and reload if permission changes
        camListener = () => {
          updateState();
          location.reload();
        };
        micListener = () => {
          updateState();
          location.reload();
        };

        cam.onchange = camListener;
        mic.onchange = micListener;
      } catch {
        setPermissionState('prompt');
      }
    };

    checkPermissions();

    return () => {
      // Cleanup on unmount
      camListener = null;
      micListener = null;
    };
  }, []);

  const requestAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setPermissionState('granted');
    } catch {
      toast.error(
        'Please allow access to your microphone and camera in your browser settings.',
      );
    }
  };

  const handleJoinStudio = async () => {
    if (!isReady || !socket || socket.readyState !== WebSocket.OPEN) {
      toast.error('Please wait for the connection to be established.');
      return;
    }

    if (isConnecting) {
      toast.error('Already attempting to join. Please wait.');
      return;
    }

    setIsConnecting(true);

    try {
      setIsMeetingStarted(true);
      sendMessage({
        type: 'user:join',
        data: {
          name: name,
          micOn,
          camOn,
        },
      });

      // Reset connecting state after a short delay
      setTimeout(() => setIsConnecting(false), 2000);
    } catch {
      setIsConnecting(false);
      toast.error('Failed to join studio. Please try again.');
    }
  };

  const isReadyToJoin =
    permissionState === 'granted' &&
    isReady &&
    socket &&
    socket.readyState === WebSocket.OPEN &&
    !isConnecting;

  return (
    <button
      className={
        'bg-primary-400 hover:bg-primary-500 w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50'
      }
      onClick={isReadyToJoin ? handleJoinStudio : requestAccess}
      disabled={
        isConnecting ||
        (permissionState === 'granted' &&
          (!isReady || !socket || socket.readyState !== WebSocket.OPEN))
      }
    >
      {isConnecting
        ? 'Joining...'
        : permissionState === 'granted'
          ? 'Join Studio'
          : 'Allow Access'}
    </button>
  );
}
