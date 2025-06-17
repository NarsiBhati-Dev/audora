'use client';

import { useMeetingStartStore } from '@/store/meeting-start-store';
// import { useMeetingStore } from '@/store/meeting-store';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSignalStore } from '@/store/signal-store';

interface JoinStudioButtonProps {
  // isHost: boolean;
  name: string;
}

export function JoinStudioButton({ name }: JoinStudioButtonProps) {
  const { setIsMeetingStarted } = useMeetingStartStore();
  const { sendMessage } = useSignalStore();

  const [permissionState, setPermissionState] = useState<
    'loading' | 'granted' | 'prompt' | 'denied'
  >('loading');

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
    setIsMeetingStarted(true);
    console.log('name', name);
    sendMessage({
      type: 'user:join',
      data: {
        name: name,
      },
    });
  };

  return (
    <button
      className={
        'bg-primary-400 hover:bg-primary-500 w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white transition'
      }
      onClick={permissionState === 'granted' ? handleJoinStudio : requestAccess}
    >
      {permissionState === 'granted' ? 'Join Studio' : 'Allow Access'}
    </button>
  );
}
