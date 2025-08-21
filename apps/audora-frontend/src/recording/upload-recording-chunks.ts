// import { ChunkMeta } from '@/hooks/recording/get-recording-chunks';

// // Upload configuration interface
// export interface UploadConfig {
//   endpoint: string;
//   chunkSize?: number;
//   retryAttempts?: number;
//   retryDelay?: number;
//   onProgress?: (progress: UploadProgress) => void;
//   onError?: (error: string) => void;
//   onComplete?: (result: UploadResult) => void;
// }

// // Upload progress interface
// export interface UploadProgress {
//   uploadedChunks: number;
//   totalChunks: number;
//   percentage: number;
//   uploadedBytes: number;
//   totalBytes: number;
//   currentChunkSize: number;
//   estimatedTimeRemaining: number;
//   uploadSpeed: number;
// }

// // Upload result interface
// export interface UploadResult {
//   success: boolean;
//   uploadedChunks: number;
//   totalChunks: number;
//   uploadedBytes: number;
//   totalBytes: number;
//   duration: number;
//   recordingId?: string;
//   urls?: string[];
//   error?: string;
// }

// // Upload status enum
// export enum UploadStatus {
//   IDLE = 'idle',
//   UPLOADING = 'uploading',
//   PAUSED = 'paused',
//   COMPLETED = 'completed',
//   ERROR = 'error',
//   CANCELLED = 'cancelled',
// }

// // Upload manager class
// class UploadManager {
//   private status: UploadStatus = UploadStatus.IDLE;
//   private config: UploadConfig;
//   private startTime: number = 0;
//   private uploadedBytes: number = 0;
//   private totalBytes: number = 0;
//   private uploadedChunks: number = 0;
//   private totalChunks: number = 0;
//   private uploadSpeed: number = 0;
//   private lastProgressUpdate: number = 0;
//   private abortController: AbortController | null = null;

//   constructor(config: UploadConfig) {
//     this.config = {
//       chunkSize: 1024 * 1024, // 1MB default
//       retryAttempts: 3,
//       retryDelay: 1000,
//       ...config,
//     };
//   }

//   // Helper method to check if upload should continue
//   private shouldContinueUpload(): boolean {
//     return this.status === UploadStatus.UPLOADING;
//   }

//   // Helper method to check if upload is cancelled
//   private isCancelled(): boolean {
//     return this.status === UploadStatus.CANCELLED;
//   }

//   // Helper method to check if upload is paused
//   private isPaused(): boolean {
//     return this.status === UploadStatus.PAUSED;
//   }

//   // Upload chunks with progress tracking
//   async uploadChunks(chunks: RecordingChunk[]): Promise<UploadResult> {
//     if (this.status === UploadStatus.UPLOADING) {
//       throw new Error('Upload already in progress');
//     }

//     this.status = UploadStatus.UPLOADING;
//     this.startTime = Date.now();
//     this.uploadedBytes = 0;
//     this.uploadedChunks = 0;
//     this.totalChunks = chunks.length;
//     this.totalBytes = chunks.reduce((sum, chunk) => sum + chunk.size, 0);
//     this.abortController = new AbortController();

//     try {
//       const urls: string[] = [];

//       for (let i = 0; i < chunks.length; i++) {
//         // Check if upload was cancelled
//         if (this.isCancelled()) {
//           throw new Error('Upload cancelled');
//         }

//         // Check if upload is paused and wait for resume
//         if (this.isPaused()) {
//           await this.waitForResume();
//         }

//         const chunk = chunks[i];
//         if (!chunk) {
//           throw new Error(`Chunk at index ${i} is undefined`);
//         }

//         const chunkUrl = await this.uploadChunk(chunk, i);
//         urls.push(chunkUrl);

//         this.uploadedChunks++;
//         this.uploadedBytes += chunk.size;
//         this.updateProgress();
//       }

//       const duration = Date.now() - this.startTime;
//       this.status = UploadStatus.COMPLETED;

//       const result: UploadResult = {
//         success: true,
//         uploadedChunks: this.uploadedChunks,
//         totalChunks: this.totalChunks,
//         uploadedBytes: this.uploadedBytes,
//         totalBytes: this.totalBytes,
//         duration,
//         urls,
//       };

//       this.config.onComplete?.(result);
//       return result;
//     } catch (error) {
//       this.status = UploadStatus.ERROR;
//       const errorMessage =
//         error instanceof Error ? error.message : 'Upload failed';

//       const result: UploadResult = {
//         success: false,
//         uploadedChunks: this.uploadedChunks,
//         totalChunks: this.totalChunks,
//         uploadedBytes: this.uploadedBytes,
//         totalBytes: this.totalBytes,
//         duration: Date.now() - this.startTime,
//         error: errorMessage,
//       };

//       this.config.onError?.(errorMessage);
//       return result;
//     }
//   }

//   // Upload individual chunk with retry logic
//   private async uploadChunk(
//     chunk: RecordingChunk,
//     index: number,
//   ): Promise<string> {
//     let lastError: Error | null = null;

//     for (let attempt = 1; attempt <= this.config.retryAttempts!; attempt++) {
//       try {
//         const formData = new FormData();
//         formData.append('chunk', chunk.data, `chunk-${index}.webm`);
//         formData.append('index', index.toString());
//         formData.append('timestamp', chunk.timestamp.toString());
//         formData.append('size', chunk.size.toString());
//         formData.append('id', chunk.id);

//         const response = await fetch(this.config.endpoint, {
//           method: 'POST',
//           body: formData,
//           signal: this.abortController?.signal,
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//         }

//         const result = await response.json();
//         return result.url || result.chunkUrl;
//       } catch (error) {
//         lastError = error instanceof Error ? error : new Error('Unknown error');

//         if (attempt < this.config.retryAttempts!) {
//           await this.delay(this.config.retryDelay! * attempt);
//         }
//       }
//     }

//     throw lastError || new Error('Upload failed after all retry attempts');
//   }

//   // Update progress and notify callback
//   private updateProgress(): void {
//     const now = Date.now();
//     const timeDiff = now - this.lastProgressUpdate;

//     if (timeDiff > 100) {
//       // Update every 100ms
//       const percentage = (this.uploadedChunks / this.totalChunks) * 100;
//       const duration = now - this.startTime;
//       this.uploadSpeed =
//         duration > 0 ? this.uploadedBytes / (duration / 1000) : 0;

//       const remainingBytes = this.totalBytes - this.uploadedBytes;
//       const estimatedTimeRemaining =
//         this.uploadSpeed > 0 ? (remainingBytes / this.uploadSpeed) * 1000 : 0;

//       const progress: UploadProgress = {
//         uploadedChunks: this.uploadedChunks,
//         totalChunks: this.totalChunks,
//         percentage,
//         uploadedBytes: this.uploadedBytes,
//         totalBytes: this.totalBytes,
//         currentChunkSize:
//           this.uploadedChunks > 0
//             ? this.uploadedBytes / this.uploadedChunks
//             : 0,
//         estimatedTimeRemaining,
//         uploadSpeed: this.uploadSpeed,
//       };

//       this.config.onProgress?.(progress);
//       this.lastProgressUpdate = now;
//     }
//   }

//   // Wait for resume if paused
//   private async waitForResume(): Promise<void> {
//     return new Promise(resolve => {
//       const checkResume = () => {
//         if (this.status === UploadStatus.UPLOADING) {
//           resolve();
//         } else {
//           setTimeout(checkResume, 100);
//         }
//       };
//       checkResume();
//     });
//   }

//   // Utility delay function
//   private delay(ms: number): Promise<void> {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }

//   // Pause upload
//   pause(): void {
//     if (this.status === UploadStatus.UPLOADING) {
//       this.status = UploadStatus.PAUSED;
//     }
//   }

//   // Resume upload
//   resume(): void {
//     if (this.status === UploadStatus.PAUSED) {
//       this.status = UploadStatus.UPLOADING;
//     }
//   }

//   // Cancel upload
//   cancel(): void {
//     this.status = UploadStatus.CANCELLED;
//     this.abortController?.abort();
//   }

//   // Get current status
//   getStatus(): UploadStatus {
//     return this.status;
//   }

//   // Get current progress
//   getProgress(): UploadProgress {
//     const percentage = (this.uploadedChunks / this.totalChunks) * 100;
//     const duration = Date.now() - this.startTime;
//     this.uploadSpeed =
//       duration > 0 ? this.uploadedBytes / (duration / 1000) : 0;

//     const remainingBytes = this.totalBytes - this.uploadedBytes;
//     const estimatedTimeRemaining =
//       this.uploadSpeed > 0 ? (remainingBytes / this.uploadSpeed) * 1000 : 0;

//     return {
//       uploadedChunks: this.uploadedChunks,
//       totalChunks: this.totalChunks,
//       percentage,
//       uploadedBytes: this.uploadedBytes,
//       totalBytes: this.totalBytes,
//       currentChunkSize:
//         this.uploadedChunks > 0 ? this.uploadedBytes / this.uploadedChunks : 0,
//       estimatedTimeRemaining,
//       uploadSpeed: this.uploadSpeed,
//     };
//   }
// }

// // Global upload manager instance
// let uploadManager: UploadManager | null = null;

// // Initialize upload manager
// const getUploadManager = (config: UploadConfig): UploadManager => {
//   if (!uploadManager) {
//     uploadManager = new UploadManager(config);
//   }
//   return uploadManager;
// };

// // Main upload function
// export const uploadRecordingChunks = async (
//   chunks: RecordingChunk[],
//   config: UploadConfig,
// ): Promise<UploadResult> => {
//   const manager = getUploadManager(config);
//   return await manager.uploadChunks(chunks);
// };

// // Upload with default configuration
// export const uploadRecordingChunksDefault = async (
//   chunks: RecordingChunk[],
//   endpoint: string = '/api/recording/upload-chunk',
// ): Promise<UploadResult> => {
//   return await uploadRecordingChunks(chunks, { endpoint });
// };

// // Upload complete recording blob
// export const uploadRecordingBlob = async (
//   blob: Blob,
//   config: Omit<UploadConfig, 'endpoint'> & { endpoint: string },
// ): Promise<UploadResult> => {
//   // Convert blob to chunks for consistent processing
//   const chunk: RecordingChunk = {
//     id: crypto.randomUUID(),
//     data: blob,
//     timestamp: Date.now(),
//     size: blob.size,
//   };

//   return await uploadRecordingChunks([chunk], config);
// };

// // Utility functions for upload management
// export const pauseUpload = (): void => {
//   uploadManager?.pause();
// };

// export const resumeUpload = (): void => {
//   uploadManager?.resume();
// };

// export const cancelUpload = (): void => {
//   uploadManager?.cancel();
// };

// export const getUploadStatus = (): UploadStatus => {
//   return uploadManager?.getStatus() || UploadStatus.IDLE;
// };

// export const getUploadProgress = (): UploadProgress | null => {
//   return uploadManager?.getProgress() || null;
// };

// // Utility function to format upload speed
// export const formatUploadSpeed = (bytesPerSecond: number): string => {
//   const sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
//   if (bytesPerSecond === 0) return '0 B/s';
//   const i = Math.floor(Math.log(bytesPerSecond) / Math.log(1024));
//   return (
//     Math.round((bytesPerSecond / Math.pow(1024, i)) * 100) / 100 +
//     ' ' +
//     sizes[i]
//   );
// };

// // Utility function to format time remaining
// export const formatTimeRemaining = (milliseconds: number): string => {
//   if (milliseconds < 1000) return '< 1s';
//   const seconds = Math.floor(milliseconds / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);

//   if (hours > 0) {
//     return `${hours}h ${minutes % 60}m`;
//   } else if (minutes > 0) {
//     return `${minutes}m ${seconds % 60}s`;
//   } else {
//     return `${seconds}s`;
//   }
// };
