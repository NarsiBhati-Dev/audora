export interface MeetingOptions {
  meetingId: string;
  meetingName: string;
  meetingType: 'meeting';
  meetingStatus: MeetingStatus;
  meetingStartTime: number;
  meetingEndTime: number;
  meetingDuration: number;
  meetingSize: number;
  meetingUrl: string;
}

export interface MeetingStatus {
  status: 'pending' | 'recording' | 'paused' | 'stopped';
}
