export interface RecordingChunkMessage {
  userId: string; // The user who is recording
  trackId: string; // Unique ID for this recording session
  chunkId: string; // Unique ID for this chunk
  chunkNumber: number; // Order of the chunk in sequence
  timestamp: number; // When the chunk was recorded (in ms)
  isFinal: boolean; // Whether this is the last chunk
  data: Buffer; // Binary chunk data

  // Optional metadata
  startTime?: number; // Only present on first chunk
  endTime?: number; // Only present on final chunk
  totalChunks?: number; // Helpful on final to confirm all parts
}
