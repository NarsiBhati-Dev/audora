// import { useEffect, useRef, useState } from 'react';

// interface UseRecordingOptions {
//   onChunk: (chunk: Blob) => void;
//   onStop: () => void;
//   onError: (error: Error) => void;
//   onStart: () => void;
//   mimeType?: string;
//   timeSliceMs?: number;
//   stream: MediaStream | null;
// }

// export const useRecording = ({
//   onChunk,
//   onStop,
//   stream,
//   onError,
//   onStart,
//   mimeType = 'video/webm;codecs=vp8,opus',
//   timeSliceMs = 5000,
// }: UseRecordingOptions) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const recorderRef = useRef<MediaRecorder | null>(null);

//   const startRecording = async () => {
//     if (isRecording || !stream) return;

//     try {
//       const recorder = new MediaRecorder(stream, { mimeType });

//       recorder.ondataavailable = e => {
//         if (e.data && e.data.size > 0) {
//           onChunk(e.data);
//         }
//       };

//       recorder.onerror = e => {
//         onError(e.error);
//       };

//       recorder.onstop = () => {
//         recorderRef.current = null;
//         onStop();
//       };

//       recorderRef.current = recorder;
//       recorder.start(timeSliceMs);

//       setIsRecording(true);
//       onStart();
//     } catch (err) {
//       onError(err as Error);
//     }
//   };

//   const stopRecording = () => {
//     if (recorderRef.current && recorderRef.current.state !== 'inactive') {
//       recorderRef.current.stop();
//       recorderRef.current = null;
//       setIsRecording(false);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       stopRecording();
//     };
//   }, []);

//   return {
//     startRecording,
//     stopRecording,
//     isRecording,
//   };
// };

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

export const useRecording = ({
  stream,
  mimeType = 'video/webm;codecs=vp8,opus',
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
      const recorder = new MediaRecorder(stream, { mimeType });

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

      recorder.onerror = e => onError?.(e.error);

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
    } catch (err) {
      onError?.(err as Error);
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
