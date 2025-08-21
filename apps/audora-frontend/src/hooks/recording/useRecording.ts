import { useEffect, useRef, useState } from 'react';

interface ChunkMeta {
  blob: Blob;
  index: number;
  timestamp: number;
  startTime: number;
  endTime: number;
}

interface UseRecordingOptions {
  stream: MediaStream | null;
  mimeType?: string;
  timeSliceMs?: number;
  onStart?: () => void;
  onStop?: () => void;
  onError?: (error: Error) => void;
  onChunk?: (chunk: ChunkMeta) => void;
}

// Supported MIME types in order of preference
const SUPPORTED_MIME_TYPES = [
  'video/webm;codecs=vp8,opus',
  'video/webm;codecs=vp9,opus',
  'video/webm;codecs=vp8',
  'video/webm',
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/mp4',
  'audio/ogg;codecs=opus',
  'audio/wav',
];

// Get the best supported MIME type
const getSupportedMimeType = (preferredType?: string): string => {
  // If a preferred type is provided, check if it's supported
  if (preferredType && MediaRecorder.isTypeSupported(preferredType)) {
    return preferredType;
  }

  // Find the first supported MIME type
  for (const mimeType of SUPPORTED_MIME_TYPES) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      return mimeType;
    }
  }

  // Fallback to default
  return 'video/webm';
};

export const useRecording = ({
  stream,
  mimeType,
  timeSliceMs = 5000,
  onStart,
  onStop,
  onError,
  onChunk,
}: UseRecordingOptions) => {
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunkIndexRef = useRef(0);
  const startTimeRef = useRef<number>(Date.now());

  const startRecording = async () => {
    if (!stream || isRecording) return;

    try {
      // Get the best supported MIME type
      const supportedMimeType = getSupportedMimeType(mimeType);

      // Check if stream has tracks
      if (stream.getTracks().length === 0) {
        throw new Error('No media tracks available for recording');
      }

      // Create MediaRecorder with supported MIME type
      const recorder = new MediaRecorder(stream, {
        mimeType: supportedMimeType,
      });

      recorder.ondataavailable = e => {
        if (e.data.size > 0) {
          const now = Date.now();
          const chunk: ChunkMeta = {
            blob: e.data,
            index: chunkIndexRef.current++,
            timestamp: now,
            startTime: startTimeRef.current,
            endTime: now,
          };
          onChunk?.(chunk);
          startTimeRef.current = now;
        }
      };

      recorder.onerror = e => {
        console.error('MediaRecorder error:', e.error);
        onError?.(e.error || new Error('MediaRecorder error'));
      };

      recorder.onstop = () => {
        setIsRecording(false);
        onStop?.();
      };

      recorderRef.current = recorder;
      recorder.start(timeSliceMs);

      chunkIndexRef.current = 0;
      startTimeRef.current = Date.now();
      setIsRecording(true);
      onStart?.();
    } catch (error) {
      console.error('Failed to start recording:', error);
      onError?.(error as Error);
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
      recorderRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopRecording();
  }, []);

  return {
    startRecording,
    stopRecording,
    isRecording,
  };
};
