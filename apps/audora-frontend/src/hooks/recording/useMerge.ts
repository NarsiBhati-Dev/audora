import { useState } from 'react';

interface ChunkMeta {
  blob: Blob;
  index: number;
  timestamp: number;
  startTime: number;
  endTime: number;
}

export const useMerge = () => {
  const [chunks, setChunks] = useState<ChunkMeta[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const addChunk = (chunk: ChunkMeta) => {
    setChunks(prev => [...prev, chunk]);
  };

  const clear = () => {
    setChunks([]);
    setVideoUrl(null);
  };

  const mergeChunks = () => {
    const sorted = [...chunks].sort((a, b) => a.index - b.index);
    const blob = new Blob(
      sorted.map(c => c.blob),
      { type: 'video/webm' },
    );
    const url = URL.createObjectURL(blob);
    setVideoUrl(url);
    return url;
  };

  return {
    chunks,
    addChunk,
    videoUrl,
    mergeChunks,
    clear,
  };
};
