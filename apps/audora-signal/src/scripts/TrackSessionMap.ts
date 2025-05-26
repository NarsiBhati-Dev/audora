export interface MediaChunk {
  url: string;
  start: number;
  end: number;
}

export class TrackSessionMap {
  private userTracks: Map<string, MediaChunk[]> = new Map();

  addUser(userId: string, timestamp: number) {
    if (!this.userTracks.has(userId)) {
      this.userTracks.set(userId, []);
    }
  }

  markUserLeft(userId: string, timestamp: number) {
    // Optional: mark end time or flag as offline
  }

  startRecording(userId: string, timestamp: number) {
    // Optional: record when recording started
  }

  stopRecording(userId: string, timestamp: number) {
    // Optional: record when recording stopped
  }

  addChunk(userId: string, url: string, start: number, end: number) {
    if (!this.userTracks.has(userId)) {
      this.userTracks.set(userId, []);
    }
    this.userTracks.get(userId)?.push({ url, start, end });
  }

  getUserTracks() {
    return Array.from(this.userTracks.entries());
  }
}
