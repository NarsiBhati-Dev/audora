import jwt from "jsonwebtoken";
import { NEXTAUTH_SECRET } from "../config";

export interface MeetingTokenPayload {
  studioId: string;
  studioSlug: string;
  roomId: string;
  userId: string;
  participantId: string;
  participantRole: "host" | "guest";
  recordable: boolean;
}

/**
 * Verify the meeting-scoped JWT token and return full payload.
 * @param token - The JWT token.
 * @returns The meeting token payload.
 */

export const verifyMeetingToken = (
  token: string,
): MeetingTokenPayload | null => {
  try {
    const decoded = jwt.verify(
      token,
      NEXTAUTH_SECRET as string,
    ) as MeetingTokenPayload;
    return decoded;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
};
