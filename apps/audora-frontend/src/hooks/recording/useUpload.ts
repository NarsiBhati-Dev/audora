// import { useState, useEffect, useCallback } from 'react';
// import {
//   uploadRecordingChunks,
//   uploadRecordingBlob,
//   pauseUpload,
//   resumeUpload,
//   cancelUpload,
//   getUploadStatus,
//   getUploadProgress,
//   formatUploadSpeed,
//   formatTimeRemaining,
//   UploadStatus,
//   type UploadConfig,
//   type UploadProgress,
//   type UploadResult,
// } from '@/recording/upload-recording-chunks';
// import { type RecordingChunk } from '@/recording/get-recording-chunks';

// interface UseUploadReturn {
//   // State
//   status: UploadStatus;
//   progress: UploadProgress | null;
//   isUploading: boolean;
//   isPaused: boolean;
//   isCompleted: boolean;
//   hasError: boolean;

//   // Actions
//   uploadChunks: (
//     chunks: RecordingChunk[],
//     config: UploadConfig,
//   ) => Promise<UploadResult>;
//   uploadBlob: (
//     blob: Blob,
//     config: Omit<UploadConfig, 'endpoint'> & { endpoint: string },
//   ) => Promise<UploadResult>;
//   pause: () => void;
//   resume: () => void;
//   cancel: () => void;

//   // Utilities
//   formattedSpeed: string;
//   formattedTimeRemaining: string;
//   percentage: number;
// }

// export const useUpload = (): UseUploadReturn => {
//   const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);
//   const [progress, setProgress] = useState<UploadProgress | null>(null);
//   const [result, setResult] = useState<UploadResult | null>(null);

//   // Update status and progress periodically
//   useEffect(() => {
//     const updateStatus = () => {
//       const currentStatus = getUploadStatus();
//       const currentProgress = getUploadProgress();

//       setStatus(currentStatus);
//       setProgress(currentProgress);
//     };

//     // Initial update
//     updateStatus();

//     // Set up periodic updates when uploading
//     const interval = setInterval(() => {
//       if (getUploadStatus() === UploadStatus.UPLOADING) {
//         updateStatus();
//       }
//     }, 100);

//     return () => clearInterval(interval);
//   }, []);

//   // Upload chunks with progress tracking
//   const uploadChunks = useCallback(
//     async (
//       chunks: RecordingChunk[],
//       config: UploadConfig,
//     ): Promise<UploadResult> => {
//       const uploadConfig: UploadConfig = {
//         ...config,
//         onProgress: progress => {
//           setProgress(progress);
//           config.onProgress?.(progress);
//         },
//         onError: error => {
//           setResult({ success: false, error } as UploadResult);
//           config.onError?.(error);
//         },
//         onComplete: result => {
//           setResult(result);
//           config.onComplete?.(result);
//         },
//       };

//       return await uploadRecordingChunks(chunks, uploadConfig);
//     },
//     [],
//   );

//   // Upload blob
//   const uploadBlob = useCallback(
//     async (
//       blob: Blob,
//       config: Omit<UploadConfig, 'endpoint'> & { endpoint: string },
//     ): Promise<UploadResult> => {
//       const uploadConfig: UploadConfig = {
//         ...config,
//         onProgress: progress => {
//           setProgress(progress);
//           config.onProgress?.(progress);
//         },
//         onError: error => {
//           setResult({ success: false, error } as UploadResult);
//           config.onError?.(error);
//         },
//         onComplete: result => {
//           setResult(result);
//           config.onComplete?.(result);
//         },
//       };

//       return await uploadRecordingBlob(blob, uploadConfig);
//     },
//     [],
//   );

//   // Pause upload
//   const pause = useCallback(() => {
//     pauseUpload();
//   }, []);

//   // Resume upload
//   const resume = useCallback(() => {
//     resumeUpload();
//   }, []);

//   // Cancel upload
//   const cancel = useCallback(() => {
//     cancelUpload();
//   }, []);

//   // Computed values
//   const isUploading = status === UploadStatus.UPLOADING;
//   const isPaused = status === UploadStatus.PAUSED;
//   const isCompleted = status === UploadStatus.COMPLETED;
//   const hasError = status === UploadStatus.ERROR;

//   const formattedSpeed = progress
//     ? formatUploadSpeed(progress.uploadSpeed)
//     : '0 B/s';
//   const formattedTimeRemaining = progress
//     ? formatTimeRemaining(progress.estimatedTimeRemaining)
//     : '< 1s';
//   const percentage = progress ? progress.percentage : 0;

//   return {
//     // State
//     status,
//     progress,
//     isUploading,
//     isPaused,
//     isCompleted,
//     hasError,

//     // Actions
//     uploadChunks,
//     uploadBlob,
//     pause,
//     resume,
//     cancel,

//     // Utilities
//     formattedSpeed,
//     formattedTimeRemaining,
//     percentage,
//   };
// };

// // Hook for upload progress only
// export const useUploadProgress = () => {
//   const [progress, setProgress] = useState<UploadProgress | null>(null);

//   useEffect(() => {
//     const updateProgress = () => {
//       const currentProgress = getUploadProgress();
//       setProgress(currentProgress);
//     };

//     // Initial update
//     updateProgress();

//     // Set up periodic updates
//     const interval = setInterval(updateProgress, 100);

//     return () => clearInterval(interval);
//   }, []);

//   return progress;
// };

// // Hook for upload status only
// export const useUploadStatus = () => {
//   const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);

//   useEffect(() => {
//     const updateStatus = () => {
//       const currentStatus = getUploadStatus();
//       setStatus(currentStatus);
//     };

//     // Initial update
//     updateStatus();

//     // Set up periodic updates
//     const interval = setInterval(updateStatus, 100);

//     return () => clearInterval(interval);
//   }, []);

//   return status;
// };
