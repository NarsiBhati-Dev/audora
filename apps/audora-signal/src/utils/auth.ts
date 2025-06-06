// utils/auth.ts

import {
  getMeetingByTokenService,
  verifyMeetingTokenService,
} from "@audora/database/meetingServices";

// Validate if the given user is the actual host for a meeting.

export async function isValidHost(
  userId: string,
  studioId: string
): Promise<boolean> {
  const meeting = await getMeetingByTokenService(studioId, userId);
  return !!meeting && meeting.hostId === userId;
}

// Validate if the guest token is valid (not expired, matches studio).

export async function isValidGuestToken(
  token: string,
  studioId: string
): Promise<boolean> {
  const meeting = await verifyMeetingTokenService(studioId, token);
  return !!meeting;
}
