// import { useSystemStreamStore } from '@/store/webrtc/system-stream';

// // Recording chunk interface
// export interface RecordingChunk {
//   id: string;
//   data: Blob;
//   timestamp: number;
//   size: number;
// }

// // Recording state interface
// export interface RecordingState {
//   isRecording: boolean;
//   startTime: number | null;
//   duration: number;
//   chunks: RecordingChunk[];
//   queue: RecordingChunk[];
//   mediaRecorder: MediaRecorder | null;
//   error: string | null;
// }

// // Queue management class
// class RecordingQueue {
//   private queue: RecordingChunk[] = [];
//   private maxQueueSize: number;
//   private processing: boolean = false;

//   constructor(maxSize: number = 100) {
//     this.maxQueueSize = maxSize;
//   }

//   enqueue(chunk: RecordingChunk): void {
//     this.queue.push(chunk);

//     // Maintain queue size limit
//     if (this.queue.length > this.maxQueueSize) {
//       this.queue.shift(); // Remove oldest chunk
//     }
//   }

//   dequeue(): RecordingChunk | undefined {
//     return this.queue.shift();
//   }

//   getQueue(): RecordingChunk[] {
//     return [...this.queue];
//   }

//   clear(): void {
//     this.queue = [];
//   }

//   getSize(): number {
//     return this.queue.length;
//   }

//   isEmpty(): boolean {
//     return this.queue.length === 0;
//   }

//   isFull(): boolean {
//     return this.queue.length >= this.maxQueueSize;
//   }
// }

// // Recording manager class
// class RecordingManager {
//   private mediaRecorder: MediaRecorder | null = null;
//   private queue: RecordingQueue;
//   private chunks: RecordingChunk[] = [];
//   private startTime: number | null = null;
//   private isRecording: boolean = false;
//   private error: string | null = null;

//   // Supported codecs and configurations
//   private static readonly SUPPORTED_CODECS = [
//     'audio/webm;codecs=opus',
//     'audio/webm;codecs=vorbis',
//     'audio/mp4;codecs=mp4a.40.2',
//     'audio/ogg;codecs=opus',
//     'audio/wav',
//   ];

//   constructor(queueSize: number = 100) {
//     this.queue = new RecordingQueue(queueSize);
//   }

//   // Get the best available codec
//   private getBestCodec(): string {
//     for (const codec of RecordingManager.SUPPORTED_CODECS) {
//       if (MediaRecorder.isTypeSupported(codec)) {
//         return codec;
//       }
//     }
//     // Fallback to default
//     return 'audio/webm';
//   }

//   // Start recording
//   async startRecording(stream: MediaStream): Promise<void> {
//     try {
//       if (this.isRecording) {
//         throw new Error('Recording is already in progress');
//       }

//       if (!stream || stream.getAudioTracks().length === 0) {
//         throw new Error('No audio tracks available for recording');
//       }

//       const codec = this.getBestCodec();
//       const options: MediaRecorderOptions = {
//         mimeType: codec,
//         audioBitsPerSecond: 128000, // 128 kbps for good quality
//       };

//       this.mediaRecorder = new MediaRecorder(stream, options);
//       this.chunks = [];
//       this.startTime = Date.now();
//       this.isRecording = true;
//       this.error = null;

//       // Set up event handlers
//       this.mediaRecorder.ondataavailable = event => {
//         if (event.data.size > 0) {
//           const chunk: RecordingChunk = {
//             id: crypto.randomUUID(),
//             data: event.data,
//             timestamp: Date.now(),
//             size: event.data.size,
//           };

//           this.chunks.push(chunk);
//           this.queue.enqueue(chunk);
//         }
//       };

//       this.mediaRecorder.onerror = event => {
//         this.error = `Recording error: ${event.error?.message || 'Unknown error'}`;
//         this.stopRecording();
//       };

//       this.mediaRecorder.onstop = () => {
//         this.isRecording = false;
//       };

//       // Start recording with 1-second timeslice for regular chunks
//       this.mediaRecorder.start(1000);
//     } catch (err) {
//       this.error =
//         err instanceof Error ? err.message : 'Failed to start recording';
//       throw new Error(this.error);
//     }
//   }

//   // Stop recording
//   stopRecording(): Promise<Blob> {
//     return new Promise((resolve, reject) => {
//       if (!this.mediaRecorder || !this.isRecording) {
//         reject(new Error('No active recording to stop'));
//         return;
//       }

//       this.mediaRecorder.onstop = () => {
//         this.isRecording = false;

//         // Create final blob from all chunks
//         const finalBlob = new Blob(
//           this.chunks.map(chunk => chunk.data),
//           {
//             type: this.mediaRecorder?.mimeType || 'audio/webm',
//           },
//         );

//         resolve(finalBlob);
//       };

//       this.mediaRecorder.stop();
//     });
//   }

//   // Pause recording
//   pauseRecording(): void {
//     if (this.mediaRecorder && this.isRecording) {
//       this.mediaRecorder.pause();
//     }
//   }

//   // Resume recording
//   resumeRecording(): void {
//     if (this.mediaRecorder && this.isRecording) {
//       this.mediaRecorder.resume();
//     }
//   }

//   // Get current recording state
//   getRecordingState(): RecordingState {
//     return {
//       isRecording: this.isRecording,
//       startTime: this.startTime,
//       duration: this.startTime ? Date.now() - this.startTime : 0,
//       chunks: [...this.chunks],
//       queue: this.queue.getQueue(),
//       mediaRecorder: this.mediaRecorder,
//       error: this.error,
//     };
//   }

//   // Get chunks from queue
//   getQueuedChunks(): RecordingChunk[] {
//     return this.queue.getQueue();
//   }

//   // Get all recorded chunks
//   getAllChunks(): RecordingChunk[] {
//     return [...this.chunks];
//   }

//   // Clear all data
//   clear(): void {
//     this.chunks = [];
//     this.queue.clear();
//     this.startTime = null;
//     this.error = null;
//   }

//   // Get recording duration
//   getDuration(): number {
//     return this.startTime ? Date.now() - this.startTime : 0;
//   }

//   // Check if recording is active
//   isActive(): boolean {
//     return this.isRecording;
//   }

//   // Get error if any
//   getError(): string | null {
//     return this.error;
//   }
// }

// // Global recording manager instance
// let recordingManager: RecordingManager | null = null;

// // Initialize recording manager
// const getRecordingManager = (): RecordingManager => {
//   if (!recordingManager) {
//     recordingManager = new RecordingManager();
//   }
//   return recordingManager;
// };

// // Main function to get recording chunks
// export const getRecordingChunks = (): RecordingChunk[] => {
//   const manager = getRecordingManager();
//   return manager.getQueuedChunks();
// };

// // Start recording function
// export const startRecording = async (): Promise<void> => {
//   const { stream } = useSystemStreamStore.getState();
//   const manager = getRecordingManager();

//   if (!stream) {
//     throw new Error('No system stream available');
//   }

//   await manager.startRecording(stream);
// };

// // Stop recording function
// export const stopRecording = async (): Promise<Blob> => {
//   const manager = getRecordingManager();
//   return await manager.stopRecording();
// };

// // Get recording state
// export const getRecordingState = (): RecordingState => {
//   const manager = getRecordingManager();
//   return manager.getRecordingState();
// };

// // Pause recording
// export const pauseRecording = (): void => {
//   const manager = getRecordingManager();
//   manager.pauseRecording();
// };

// // Resume recording
// export const resumeRecording = (): void => {
//   const manager = getRecordingManager();
//   manager.resumeRecording();
// };

// // Clear recording data
// export const clearRecording = (): void => {
//   const manager = getRecordingManager();
//   manager.clear();
// };

// // Get all recorded chunks
// export const getAllRecordingChunks = (): RecordingChunk[] => {
//   const manager = getRecordingManager();
//   return manager.getAllChunks();
// };

// // Check if recording is active
// export const isRecordingActive = (): boolean => {
//   const manager = getRecordingManager();
//   return manager.isActive();
// };

// // Get recording duration
// export const getRecordingDuration = (): number => {
//   const manager = getRecordingManager();
//   return manager.getDuration();
// };

// // Get recording error
// export const getRecordingError = (): string | null => {
//   const manager = getRecordingManager();
//   return manager.getError();
// };

// // Utility function to format duration
// export const formatDuration = (milliseconds: number): string => {
//   const seconds = Math.floor(milliseconds / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);

//   const pad = (num: number): string => num.toString().padStart(2, '0');

//   if (hours > 0) {
//     return `${pad(hours)}:${pad(minutes % 60)}:${pad(seconds % 60)}`;
//   }
//   return `${pad(minutes)}:${pad(seconds % 60)}`;
// };

// // Utility function to get file size in human readable format
// export const formatFileSize = (bytes: number): string => {
//   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//   if (bytes === 0) return '0 Bytes';
//   const i = Math.floor(Math.log(bytes) / Math.log(1024));
//   return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
// };
