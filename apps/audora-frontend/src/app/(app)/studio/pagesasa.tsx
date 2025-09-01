'use client';

// import MeetingStart from '@/components/studio/meeting/meeting-start';
// import { RecordingExample } from '@/components/studio/recording-example';
import React from 'react';
//  import { useMediaDevices } from '@/hooks/useMediaDevices';
// import { useSystemStreamStore } from '@/store/webrtc/system-stream';
import RecordingExamplePage from '@/components/studio/recording-example-page';

const StudioPage = () => {
  // const {
  //   cameras,
  //   microphones,
  //   speakers,
  //   stream,
  //   videoDeviceId,
  //   audioInputId,
  //   audioOutputId,
  //   cameraOn,
  //   micOn,
  //   loading,
  //   error,
  // } = useMediaDevices();

  // const { setAllSettings } = useSystemStreamStore();

  // useEffect(() => {
  //   if (stream) {
  //     setAllSettings({
  //       stream,
  //       videoDeviceId,
  //       audioInputId,
  //       audioOutputId,
  //       camOn: cameraOn,
  //       micOn: micOn,
  //     });
  //   }
  // }, [stream]);

  return <RecordingExamplePage />;
};

export default StudioPage;
