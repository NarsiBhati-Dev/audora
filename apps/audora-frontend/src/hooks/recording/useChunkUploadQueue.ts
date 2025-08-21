import { useEffect, useRef, useState } from 'react';
import { uploadChunks } from '@/actions/upload-chunks';

type ChunkTask = {
  blob: Blob;
  userId: string;
  roomId: string;
  startTime?: number;
  endTime?: number;
  projectId: string;
  isFinal: boolean;
  trackId?: string;
};

export const useChunkUploadQueue = () => {
  const queue = useRef<ChunkTask[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadChunk = async (task: ChunkTask) => {
    const formData = new FormData();
    formData.append('chunk', task.blob);
    formData.append('trackId', task.trackId ?? 'null');
    formData.append('userId', task.userId);
    formData.append('roomId', task.roomId);
    formData.append('projectId', task.projectId);
    formData.append('isFinal', String(task.isFinal));
    if (task.startTime) formData.append('startTime', String(task.startTime));
    if (task.endTime) formData.append('endTime', String(task.endTime));

    await uploadChunks(formData);
  };

  const processQueue = async () => {
    if (isUploading || queue.current.length === 0) return;

    setIsUploading(true);
    while (queue.current.length > 0) {
      const task = queue.current.shift();
      try {
        if (task) await uploadChunk(task);
      } catch (err) {
        console.error('Chunk upload failed, requeueing...', err);
        queue.current.unshift(task!); // retry later
        break;
      }
    }
    setIsUploading(false);
  };

  const enqueue = (task: ChunkTask) => {
    queue.current.push(task);
    processQueue(); // trigger processing
  };

  useEffect(() => {
    const interval = setInterval(() => {
      processQueue();
    }, 2000); // retry every 2s
    return () => clearInterval(interval);
  }, []);

  return { enqueue, isUploading };
};
