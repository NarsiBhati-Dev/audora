import { useEffect, useState } from 'react';

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
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let localStream: MediaStream;

    const getDevices = async () => {
      setLoading(true);
      try {
        stream?.getTracks().forEach(track => track.stop());

        localStream = await navigator.mediaDevices.getUserMedia({
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

        setStream(localStream);
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
      } catch {
        setError('Unknown error');
      } finally {
        setLoading(false);
      }
    };

    getDevices();

    return () => {
      localStream?.getTracks().forEach(track => track.stop());
    };
  }, [videoDeviceId, audioInputId]);

  const toggleMic = () => {
    if (!stream) return;
    stream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
    setMicOn(prev => !prev);
  };

  const toggleCamera = () => {
    if (!stream) return;
    stream.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
    setCameraOn(prev => !prev);
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
    loading,
    error,
  };
};
