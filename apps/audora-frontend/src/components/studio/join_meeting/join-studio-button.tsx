'use client';

import { useEffect, useState } from 'react';

export function JoinStudioButton() {
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
      alert(
        'Please allow access to your microphone and camera in your browser settings.',
      );
    }
  };

  const handleJoin = () => {
    console.log('Joining studio...');
    // trigger WebSocket + WebRTC logic
  };

  return (
    <button
      className={
        'bg-primary-400 hover:bg-primary-500 w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white transition'
      }
      onClick={permissionState === 'granted' ? handleJoin : requestAccess}
    >
      {permissionState === 'granted' ? 'Join Studio' : 'Allow Access'}
    </button>
  );
}
