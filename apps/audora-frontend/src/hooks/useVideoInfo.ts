import { useEffect, useState } from 'react';

type VideoInfo = {
  width: number;
  height: number;
  frameRate: number;
};

export function useVideoInfo(stream: MediaStream | null): VideoInfo {
  const [videoInfo, setVideoInfo] = useState<VideoInfo>({
    width: 0,
    height: 0,
    frameRate: 0,
  });

  useEffect(() => {
    if (!stream) return;

    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      const settings = videoTrack.getSettings();
      setVideoInfo({
        width: settings.width || 0,
        height: settings.height || 0,
        frameRate: settings.frameRate ? Math.round(settings.frameRate) : 0,
      });
    }
  }, [stream]);

  return videoInfo;
}
