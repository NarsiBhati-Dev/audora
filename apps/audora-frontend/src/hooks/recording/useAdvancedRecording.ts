import { useEffect, useRef, useState, useCallback } from 'react';

interface ChunkData {
  blob: Blob;
  index: number;
  startTime: number;
  endTime: number;
  timestamp: number;
  size: number;
}

interface RecordingState {
  isRecording: boolean;
  isCountdownActive: boolean;
  countdownValue: number;
  recordingStartTime: number | null;
  currentChunkStartTime: number;
  chunkIndex: number;
  totalDuration: number;
}

interface UseAdvancedRecordingOptions {
  stream: MediaStream | null;
  chunkDurationMs?: number;
  countdownDuration?: number;
  mimeType?: string;
  onChunkAvailable?: (chunk: ChunkData) => void;
  onRecordingStart?: () => void;
  onRecordingStop?: () => void;
  onCountdownStart?: () => void;
  onCountdownComplete?: () => void;
  onError?: (error: Error) => void;
}

// Supported MIME types in order of preference
const SUPPORTED_MIME_TYPES = [
  'video/webm;codecs=vp9,opus',
  'video/webm;codecs=vp8,opus',
  'video/webm;codecs=vp9',
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
  if (preferredType && MediaRecorder.isTypeSupported(preferredType)) {
    return preferredType;
  }

  for (const mimeType of SUPPORTED_MIME_TYPES) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      return mimeType;
    }
  }

  return 'video/webm';
};

export const useAdvancedRecording = ({
  stream,
  chunkDurationMs = 5000, // 5 seconds per chunk
  countdownDuration = 5,
  mimeType,
  onChunkAvailable,
  onRecordingStart,
  onRecordingStop,
  onCountdownStart,
  onCountdownComplete,
  onError,
}: UseAdvancedRecordingOptions) => {
  const [state, setState] = useState<RecordingState>({
    isRecording: false,
    isCountdownActive: false,
    countdownValue: countdownDuration,
    recordingStartTime: null,
    currentChunkStartTime: 0,
    chunkIndex: 0,
    totalDuration: 0,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const restartTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isRecordingRef = useRef(false);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (recordingTimerRef.current) {
      clearTimeout(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearTimeout(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
  }, []);

  // Start countdown
  const startCountdown = useCallback(
    (duration: number, onComplete: () => void) => {
      setState(prev => ({
        ...prev,
        isCountdownActive: true,
        countdownValue: duration,
      }));

      onCountdownStart?.();

      const countdownInterval = setInterval(() => {
        setState(prev => {
          const newCount = prev.countdownValue - 1;

          if (newCount <= 0) {
            clearInterval(countdownInterval);
            setState(prev => ({
              ...prev,
              isCountdownActive: false,
              countdownValue: duration,
            }));
            onCountdownComplete?.();
            onComplete();
            return prev;
          }

          return {
            ...prev,
            countdownValue: newCount,
          };
        });
      }, 1000);
    },
    [onCountdownStart, onCountdownComplete],
  );

  // Start new recorder instance
  const startNewRecorder = useCallback(() => {
    if (!stream || !isRecordingRef.current) {
      return;
    }

    try {
      const supportedMimeType = getSupportedMimeType(mimeType);

      if (stream.getTracks().length === 0) {
        throw new Error('No media tracks available for recording');
      }

      const options = {
        mimeType: supportedMimeType,
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 4000000,
      };

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0 && state.recordingStartTime) {
          const chunkEndTime = Date.now();
          const actualChunkDuration =
            chunkEndTime - state.currentChunkStartTime;

          const startTime = state.currentChunkStartTime;
          const endTime = startTime + actualChunkDuration;

          const chunkData: ChunkData = {
            blob: event.data,
            index: state.chunkIndex + 1,
            startTime,
            endTime,
            timestamp: chunkEndTime,
            size: event.data.size,
          };

          // Update state for next chunk
          setState(prev => ({
            ...prev,
            chunkIndex: prev.chunkIndex + 1,
            currentChunkStartTime: endTime,
          }));

          onChunkAvailable?.(chunkData);
        }
      };

      mediaRecorder.onerror = event => {
        console.error('MediaRecorder error:', event.error);
        onError?.(event.error || new Error('MediaRecorder error'));
      };

      mediaRecorder.onstop = () => {
        // Only restart if recording is still active
        if (isRecordingRef.current) {
          restartTimerRef.current = setTimeout(() => {
            startNewRecorder();
          }, 200); // 200ms delay before restart
        }
      };

      mediaRecorder.start();

      // Stop this chunk after chunkDurationMs to trigger new chunk creation
      recordingTimerRef.current = setTimeout(() => {
        if (
          mediaRecorder &&
          mediaRecorder.state === 'recording' &&
          isRecordingRef.current
        ) {
          mediaRecorder.stop();
        }
      }, chunkDurationMs);
    } catch (error) {
      console.error('Failed to start recording:', error);
      onError?.(error as Error);
    }
  }, [
    stream,
    mimeType,
    chunkDurationMs,
    state.recordingStartTime,
    state.currentChunkStartTime,
    state.chunkIndex,
    onChunkAvailable,
    onError,
  ]);

  // Start recording with countdown
  const startRecording = useCallback(() => {
    if (!stream || isRecordingRef.current) {
      return;
    }

    startCountdown(countdownDuration, () => {
      // Actual recording starts after countdown
      isRecordingRef.current = true;
      const now = Date.now();

      setState(prev => ({
        ...prev,
        isRecording: true,
        recordingStartTime: now,
        currentChunkStartTime: 0,
        chunkIndex: 0,
        totalDuration: 0,
      }));

      onRecordingStart?.();
      startNewRecorder();
    });
  }, [
    stream,
    countdownDuration,
    startCountdown,
    startNewRecorder,
    onRecordingStart,
  ]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (!isRecordingRef.current) {
      return;
    }

    isRecordingRef.current = false;

    setState(prev => ({
      ...prev,
      isRecording: false,
      totalDuration: prev.recordingStartTime
        ? Date.now() - prev.recordingStartTime
        : 0,
    }));

    // Clean up current recording
    if (recordingTimerRef.current) {
      clearTimeout(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop();
    }

    onRecordingStop?.();
  }, [onRecordingStop]);

  // Update total duration while recording
  useEffect(() => {
    let durationTimer: NodeJS.Timeout;

    if (state.isRecording && state.recordingStartTime) {
      durationTimer = setInterval(() => {
        setState(prev => ({
          ...prev,
          totalDuration: prev.recordingStartTime
            ? Date.now() - prev.recordingStartTime
            : 0,
        }));
      }, 1000);
    }

    return () => {
      if (durationTimer) {
        clearInterval(durationTimer);
      }
    };
  }, [state.isRecording, state.recordingStartTime]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== 'inactive'
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [cleanup]);

  return {
    // State
    isRecording: state.isRecording,
    isCountdownActive: state.isCountdownActive,
    countdownValue: state.countdownValue,
    recordingStartTime: state.recordingStartTime,
    currentChunkStartTime: state.currentChunkStartTime,
    chunkIndex: state.chunkIndex,
    totalDuration: state.totalDuration,

    // Actions
    startRecording,
    stopRecording,

    // Utility functions
    formatDuration: (milliseconds: number): string => {
      const seconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const pad = (num: number): string => num.toString().padStart(2, '0');

      if (hours > 0) {
        return `${pad(hours)}:${pad(minutes % 60)}:${pad(seconds % 60)}`;
      }
      return `${pad(minutes)}:${pad(seconds % 60)}`;
    },
  };
};
