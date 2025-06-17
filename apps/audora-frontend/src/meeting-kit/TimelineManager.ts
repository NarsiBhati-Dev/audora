const TIMELINE_KEY = 'audora:timeline-log';
const MAX_LOGS = 1000;

export enum TimelineEventType {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
  MUTE = 'MUTE',
  UNMUTE = 'UNMUTE',
  START_SPEAKING = 'START_SPEAKING',
  STOP_SPEAKING = 'STOP_SPEAKING',
  CAMERA_ON = 'CAMERA_ON',
  CAMERA_OFF = 'CAMERA_OFF',
  RECORD_START = 'RECORD_START',
  RECORD_STOP = 'RECORD_STOP',
  SCREEN_SHARE_START = 'SCREEN_SHARE_START',
  SCREEN_SHARE_STOP = 'SCREEN_SHARE_STOP',
  CUSTOM = 'CUSTOM',
}

export interface TimelineEntry {
  timestamp: number;
  userId: string;
  type: TimelineEventType;
  metadata?: Record<string, unknown>;
}

type TimelineEventHandler = (entry: TimelineEntry) => void;

class TimelineManager {
  private logs: TimelineEntry[] = [];
  private eventHandlers: Set<TimelineEventHandler> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const raw = localStorage.getItem(TIMELINE_KEY);
    if (raw) {
      try {
        this.logs = JSON.parse(raw);
        this.validateLogs();
      } catch (err) {
        console.error('Failed to parse logs from storage', err);
        this.logs = [];
      }
    }
  }

  private validateLogs() {
    this.logs = this.logs.filter(log => {
      if (!log.timestamp || !log.userId || !log.type) {
        console.warn('Invalid log entry found:', log);
        return false;
      }
      return true;
    });
  }

  private saveToStorage() {
    localStorage.setItem(TIMELINE_KEY, JSON.stringify(this.logs));
  }

  private notifyHandlers(entry: TimelineEntry) {
    this.eventHandlers.forEach(handler => handler(entry));
  }

  log(
    userId: string,
    type: TimelineEventType,
    metadata?: Record<string, unknown>,
  ) {
    if (!userId || !type) {
      console.error('Invalid log parameters:', { userId, type });
      return;
    }

    const entry: TimelineEntry = {
      timestamp: Date.now(),
      userId,
      type,
      metadata,
    };

    this.logs.push(entry);

    if (this.logs.length > MAX_LOGS) {
      this.logs = this.logs.slice(-MAX_LOGS);
    }

    this.saveToStorage();
    this.notifyHandlers(entry);
  }

  getLogs(): TimelineEntry[] {
    return [...this.logs];
  }

  getLogsByTimeRange(startTime: number, endTime: number): TimelineEntry[] {
    return this.logs.filter(
      log => log.timestamp >= startTime && log.timestamp <= endTime,
    );
  }

  getLogsByUser(userId: string): TimelineEntry[] {
    return this.logs.filter(log => log.userId === userId);
  }

  getLogsByType(type: TimelineEventType): TimelineEntry[] {
    return this.logs.filter(log => log.type === type);
  }

  onLog(handler: TimelineEventHandler): () => void {
    this.eventHandlers.add(handler);
    return () => this.eventHandlers.delete(handler);
  }

  flushToJSON(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  clear() {
    this.logs = [];
    localStorage.removeItem(TIMELINE_KEY);
    this.eventHandlers.clear();
  }

  cleanupOldLogs() {
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    this.logs = this.logs.filter(log => log.timestamp > oneDayAgo);
    this.saveToStorage();
  }
}

export default TimelineManager;
