import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

type DeviceOption = {
  label: string;
  deviceId: string;
};

export const useMediaDevices = () => {
  const [cameras, setCameras] = useState<DeviceOption[]>([]);
  const [microphones, setMicrophones] = useState<DeviceOption[]>([]);
  const [speakers, setSpeakers] = useState<DeviceOption[]>([]);
  const [videoDeviceId, setVideoDeviceId] = useState<string>('');
  const [audioInputId, setAudioInputId] = useState<string>('');
  const [audioOutputId, setAudioOutputId] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const stopAllTracks = () => {
    const currentStream = streamRef.current;
    if (!currentStream) return;
    currentStream.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  };

  useEffect(() => {
    const getDevices = async () => {
      setLoading(true);
      try {
        // First check permissions
        const permissions = await Promise.all([
          navigator.permissions.query({ name: 'camera' as PermissionName }),
          navigator.permissions.query({ name: 'microphone' as PermissionName }),
        ]);

        if (
          permissions[0].state === 'denied' ||
          permissions[1].state === 'denied'
        ) {
          setLoading(false);
          setError('Camera or microphone access denied');
          return;
        }

        const localStream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: videoDeviceId ? { exact: videoDeviceId } : undefined,
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30, max: 60 },
          },
          audio: {
            deviceId: audioInputId ? { exact: audioInputId } : undefined,
          },
        });

        // Stop any existing tracks before setting new stream
        if (streamRef.current) {
          stopAllTracks();
        }

        setStream(localStream);
        streamRef.current = localStream;
        setCameraOn(true);
        setMicOn(true);

        const devices = await navigator.mediaDevices.enumerateDevices();
        const cams: DeviceOption[] = [];
        const mics: DeviceOption[] = [];
        const outs: DeviceOption[] = [];
        const labelSet = new Set<string>();

        for (const device of devices) {
          const label = device.label || device.deviceId;
          const kindLabelKey = `${device.kind}|${label}`;

          if (/^default\s*-/i.test(label) || labelSet.has(kindLabelKey))
            continue;
          labelSet.add(kindLabelKey);

          const option = { label, deviceId: device.deviceId };
          if (device.kind === 'videoinput') cams.push(option);
          else if (device.kind === 'audioinput') mics.push(option);
          else if (device.kind === 'audiooutput') outs.push(option);
        }

        setCameras(cams);
        setMicrophones(mics);
        setSpeakers(outs);

        if (!videoDeviceId) setVideoDeviceId(cams[0]?.deviceId || '');
        if (!audioInputId) setAudioInputId(mics[0]?.deviceId || '');
        if (!audioOutputId) setAudioOutputId(outs[0]?.deviceId || '');

        setError(null);
      } catch (err) {
        // console.error('Error accessing media devices:', err);
        toast.error('Failed to access media devices');
        setError(
          err instanceof Error ? err.message : 'Failed to access media devices',
        );
      } finally {
        setLoading(false);
      }
    };

    getDevices();

    return () => {
      // Only stop tracks if we're not just switching devices
      // if (!videoDeviceId && !audioInputId) {
      // }
      stopAllTracks();
    };
  }, [videoDeviceId, audioInputId]);

  const toggleMic = () => {
    const currentStream = streamRef.current;
    if (!currentStream) return;
    currentStream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
    setMicOn(prev => !prev);
  };

  const toggleCamera = () => {
    const currentStream = streamRef.current;
    if (!currentStream) return;
    currentStream.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
    setCameraOn(prev => !prev);
  };

  const stopCamera = () => {
    const currentStream = streamRef.current;
    if (!currentStream) return;
    currentStream.getVideoTracks().forEach(track => track.stop());
    setCameraOn(false);
  };

  const stopMic = () => {
    const currentStream = streamRef.current;
    if (!currentStream) return;
    currentStream.getAudioTracks().forEach(track => track.stop());
    setMicOn(false);
  };

  return {
    cameras,
    microphones,
    speakers,
    stream,
    videoDeviceId,
    setVideoDeviceId,
    audioInputId,
    setAudioInputId,
    audioOutputId,
    setAudioOutputId,
    cameraOn,
    micOn,
    toggleCamera,
    toggleMic,
    stopCamera,
    stopMic,
    loading,
    error,
  };
};
