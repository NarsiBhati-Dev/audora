# Audio Recording & Upload System

This comprehensive system provides audio recording using the MediaRecorder API with queue management, chunk-based uploads, and best practices for both recording and uploading.

## Features

- **MediaRecorder API Integration**: Uses the native browser MediaRecorder API for efficient audio recording
- **Queue Management**: Implements a queue system for managing recording chunks with configurable size limits
- **Multiple Codec Support**: Automatically selects the best available codec (Opus, Vorbis, MP4A, WAV)
- **Real-time Updates**: Provides real-time duration, size, and chunk count tracking
- **Pause/Resume**: Full pause and resume functionality during recording and upload
- **Chunk-based Upload**: Uploads recording chunks individually with progress tracking
- **Retry Logic**: Automatic retry with exponential backoff for failed uploads
- **Upload Progress**: Real-time upload speed, time remaining, and progress tracking
- **Error Handling**: Comprehensive error handling and validation
- **TypeScript Support**: Fully typed with TypeScript interfaces
- **React Hooks**: Easy-to-use React hooks for integration

## Quick Start

### Basic Recording Usage

```tsx
import { useRecording } from '@/hooks/useRecording';

function MyComponent() {
  const { isRecording, start, stop, formattedDuration } = useRecording();

  const handleStart = async () => {
    try {
      await start();
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const handleStop = async () => {
    try {
      const blob = await stop();
      console.log('Recording completed:', blob);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  return (
    <div>
      <button onClick={handleStart} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={handleStop} disabled={!isRecording}>
        Stop Recording
      </button>
      {isRecording && <span>Duration: {formattedDuration}</span>}
    </div>
  );
}
```

### Upload Recording Chunks

```tsx
import { useUpload } from '@/hooks/useUpload';
import { getAllRecordingChunks } from '@/recording/get-recording-chunks';

function MyComponent() {
  const { uploadChunks, isUploading, percentage } = useUpload();

  const handleUpload = async () => {
    try {
      const chunks = getAllRecordingChunks();

      const result = await uploadChunks(chunks, {
        endpoint: '/api/recording/upload-chunk',
        onProgress: progress => {
          console.log('Upload progress:', progress.percentage);
        },
        onComplete: result => {
          console.log('Upload completed:', result);
        },
      });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? `Uploading... ${percentage}%` : 'Upload Recording'}
      </button>
    </div>
  );
}
```

### Using the Complete Example

```tsx
import { RecordingExample } from '@/components/studio/recording-example';

function MyPage() {
  return <RecordingExample />;
}
```

## API Reference

### useRecording Hook

The main hook that provides recording functionality.

#### Returns

```typescript
{
  // State
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  chunks: RecordingChunk[];
  queue: RecordingChunk[];
  error: string | null;

  // Actions
  start: () => Promise<void>;
  stop: () => Promise<Blob | null>;
  pause: () => void;
  resume: () => void;
  clear: () => void;

  // Utilities
  formattedDuration: string;
  totalSize: string;
  chunkCount: number;
  queueSize: number;

  // Real-time updates
  recordingState: RecordingState;
}
```

### useUpload Hook

The main hook that provides upload functionality.

#### Returns

```typescript
{
  // State
  status: UploadStatus;
  progress: UploadProgress | null;
  isUploading: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  hasError: boolean;

  // Actions
  uploadChunks: (chunks: RecordingChunk[], config: UploadConfig) => Promise<UploadResult>;
  uploadBlob: (blob: Blob, config: UploadConfig) => Promise<UploadResult>;
  pause: () => void;
  resume: () => void;
  cancel: () => void;

  // Utilities
  formattedSpeed: string;
  formattedTimeRemaining: string;
  percentage: number;
}
```

### Direct API Functions

#### Recording Functions

```typescript
import {
  startRecording,
  stopRecording,
  getRecordingChunks,
  getRecordingState,
  getAllRecordingChunks,
} from '@/recording/get-recording-chunks';

// Start recording
await startRecording();

// Get current chunks
const chunks = getRecordingChunks();

// Get all recorded chunks
const allChunks = getAllRecordingChunks();

// Get recording state
const state = getRecordingState();

// Stop recording
const blob = await stopRecording();
```

#### Upload Functions

```typescript
import {
  uploadRecordingChunks,
  uploadRecordingBlob,
  pauseUpload,
  resumeUpload,
  cancelUpload,
  getUploadStatus,
  getUploadProgress,
} from '@/recording/upload-recording-chunks';

// Upload chunks
const result = await uploadRecordingChunks(chunks, config);

// Upload blob
const result = await uploadRecordingBlob(blob, config);

// Control upload
pauseUpload();
resumeUpload();
cancelUpload();

// Get status
const status = getUploadStatus();
const progress = getUploadProgress();
```

## Data Structures

### RecordingChunk

```typescript
interface RecordingChunk {
  id: string;
  data: Blob;
  timestamp: number;
  size: number;
}
```

### RecordingState

```typescript
interface RecordingState {
  isRecording: boolean;
  startTime: number | null;
  duration: number;
  chunks: RecordingChunk[];
  queue: RecordingChunk[];
  mediaRecorder: MediaRecorder | null;
  error: string | null;
}
```

### UploadConfig

```typescript
interface UploadConfig {
  endpoint: string;
  chunkSize?: number;
  retryAttempts?: number;
  retryDelay?: number;
  onProgress?: (progress: UploadProgress) => void;
  onError?: (error: string) => void;
  onComplete?: (result: UploadResult) => void;
}
```

### UploadProgress

```typescript
interface UploadProgress {
  uploadedChunks: number;
  totalChunks: number;
  percentage: number;
  uploadedBytes: number;
  totalBytes: number;
  currentChunkSize: number;
  estimatedTimeRemaining: number;
  uploadSpeed: number;
}
```

### UploadResult

```typescript
interface UploadResult {
  success: boolean;
  uploadedChunks: number;
  totalChunks: number;
  uploadedBytes: number;
  totalBytes: number;
  duration: number;
  recordingId?: string;
  urls?: string[];
  error?: string;
}
```

### UploadStatus

```typescript
enum UploadStatus {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  ERROR = 'error',
  CANCELLED = 'cancelled',
}
```

## Upload System

### Chunk-based Upload

The upload system processes recording chunks individually:

1. **Chunk Preparation**: Each chunk is wrapped with metadata (index, timestamp, size, ID)
2. **FormData Upload**: Chunks are uploaded using FormData with proper file naming
3. **Progress Tracking**: Real-time progress updates every 100ms
4. **Retry Logic**: Failed uploads are retried with exponential backoff
5. **Pause/Resume**: Uploads can be paused and resumed at any time

### Upload Configuration

```typescript
const uploadConfig: UploadConfig = {
  endpoint: '/api/recording/upload-chunk',
  chunkSize: 1024 * 1024, // 1MB default
  retryAttempts: 3,
  retryDelay: 1000,
  onProgress: progress => {
    console.log(
      `Uploaded ${progress.uploadedChunks}/${progress.totalChunks} chunks`,
    );
  },
  onError: error => {
    console.error('Upload failed:', error);
  },
  onComplete: result => {
    console.log('Upload completed:', result);
  },
};
```

### Server Endpoint Requirements

Your server endpoint should expect:

- **Method**: POST
- **Content-Type**: multipart/form-data
- **Form Fields**:
  - `chunk`: Audio chunk blob
  - `index`: Chunk index number
  - `timestamp`: Chunk timestamp
  - `size`: Chunk size in bytes
  - `id`: Unique chunk ID

**Response Format**:

```json
{
  "url": "https://example.com/chunks/chunk-0.webm",
  "chunkUrl": "https://example.com/chunks/chunk-0.webm"
}
```

## Queue System

### Recording Queue

- Maintains a configurable queue size (default: 100 chunks)
- Automatically removes oldest chunks when queue is full
- Provides real-time queue status
- Allows for efficient processing of recording chunks

### Upload Queue

- Processes chunks sequentially to maintain order
- Supports pause/resume functionality
- Provides detailed progress tracking
- Handles network interruptions gracefully

## Codec Support

The system automatically selects the best available codec in this order:

1. `audio/webm;codecs=opus` (recommended)
2. `audio/webm;codecs=vorbis`
3. `audio/mp4;codecs=mp4a.40.2`
4. `audio/ogg;codecs=opus`
5. `audio/wav`
6. Fallback to `audio/webm`

## Error Handling

### Recording Errors

- Stream validation before recording
- MediaRecorder error handling
- Codec support validation
- Network and permission errors

### Upload Errors

- Network connectivity issues
- Server errors (4xx, 5xx)
- File size limitations
- Authentication failures
- Retry exhaustion

### Common Error Messages

- **"No system stream available"**: Ensure the system stream is initialized
- **"No audio tracks available"**: Check microphone permissions
- **"Recording is already in progress"**: Stop current recording before starting new one
- **"Upload already in progress"**: Wait for current upload to complete
- **"Upload cancelled"**: Upload was cancelled by user
- **"Upload failed after all retry attempts"**: Network/server issues persist

## Best Practices

### 1. Permission Handling

Always request microphone permissions before starting recording:

```typescript
const requestPermission = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (error) {
    console.error('Microphone permission denied:', error);
  }
};
```

### 2. Error Handling

Always wrap operations in try-catch blocks:

```typescript
const handleRecording = async () => {
  try {
    await start();
  } catch (error) {
    console.error('Recording error:', error);
  }
};

const handleUpload = async () => {
  try {
    const result = await uploadChunks(chunks, config);
  } catch (error) {
    console.error('Upload error:', error);
  }
};
```

### 3. Memory Management

Clear data when no longer needed:

```typescript
useEffect(() => {
  return () => {
    clear(); // Clean up recording data
    cancelUpload(); // Cancel any ongoing uploads
  };
}, [clear]);
```

### 4. Progress Monitoring

Monitor upload progress for user feedback:

```typescript
const { progress, isUploading, percentage } = useUpload();

useEffect(() => {
  if (progress) {
    console.log(
      `Upload: ${progress.percentage}% at ${progress.uploadSpeed} B/s`,
    );
  }
}, [progress]);
```

### 5. Chunk Processing

Process chunks efficiently:

```typescript
const { queue } = useRecording();

useEffect(() => {
  if (queue.length > 0) {
    // Process chunks in batches
    const chunksToProcess = queue.slice(0, 10);
    // Process chunks...
  }
}, [queue]);
```

## Performance Considerations

### Recording Performance

- **Chunk Size**: 1-second chunks provide good balance between memory usage and responsiveness
- **Queue Size**: Default 100 chunks limit prevents memory issues
- **Codec Selection**: Opus codec provides excellent compression and quality
- **Real-time Updates**: 100ms intervals for smooth UI updates

### Upload Performance

- **Chunk Processing**: Sequential upload maintains order and reduces server load
- **Retry Strategy**: Exponential backoff prevents server overload
- **Progress Updates**: 100ms intervals provide smooth progress feedback
- **Memory Management**: Chunks are processed and released efficiently

## Browser Compatibility

The system works in all modern browsers that support the MediaRecorder API:

- Chrome 47+
- Firefox 25+
- Safari 14.1+
- Edge 79+

## Troubleshooting

### Recording Issues

1. **Recording Not Starting**
   - Check microphone permissions
   - Ensure system stream is available
   - Verify browser supports MediaRecorder API
   - Check for existing recording sessions

2. **Poor Audio Quality**
   - Verify microphone selection
   - Check audio input levels
   - Ensure proper codec selection
   - Monitor for audio processing errors

3. **Memory Issues**
   - Reduce queue size
   - Clear recording data regularly
   - Process chunks in smaller batches
   - Monitor chunk sizes

### Upload Issues

1. **Upload Not Starting**
   - Check network connectivity
   - Verify endpoint URL is correct
   - Ensure chunks are available
   - Check for existing upload sessions

2. **Upload Failing**
   - Check server endpoint is working
   - Verify FormData format is correct
   - Monitor network connectivity
   - Check server logs for errors

3. **Slow Upload Speed**
   - Check network bandwidth
   - Reduce chunk size if needed
   - Monitor server performance
   - Consider compression options

## Examples

See `recording-example.tsx` for a complete working example of the recording and upload system.

### Components Available

- `RecordingControls`: Complete recording interface
- `RecordingProgress`: Visual recording progress
- `RecordingIndicator`: Real-time recording status
- `UploadProgress`: Upload progress with controls
- `UploadButton`: Upload trigger button
- `UploadStatusIndicator`: Real-time upload status

### Hooks Available

- `useRecording`: Main recording functionality
- `useUpload`: Main upload functionality
- `useRecordingChunks`: Chunk monitoring
- `useRecordingStatus`: Recording status
- `useUploadProgress`: Upload progress
- `useUploadStatus`: Upload status
