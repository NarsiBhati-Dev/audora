import jwt from "jsonwebtoken";
import { NEXTAUTH_SECRET } from "../config/env";

// Basic Auth Token Payload (for API)
interface TokenPayload {
  id: string;
}

// Meeting-Specific Token Payload (for WebSocket/WebRTC)
interface MeetingTokenPayload {
  studioId: string;
  studioSlug: string;
  roomId: string;
  userId: string;
  participantId: string;
  participantRole: "host" | "guest";
  recordable: boolean;
}

/**
 * Generate a general auth token for a user.
 * @param id - The user ID.
 * @returns The JWT token.
 */
export const generateToken = (id: string): string => {
  return jwt.sign({ id }, NEXTAUTH_SECRET as string, {
    expiresIn: "1d",
  });
};

/**
 * Verify the general user JWT token.
 * @param token - The JWT token.
 * @returns The user ID.
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, NEXTAUTH_SECRET as string) as TokenPayload;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
};

/**
 * Generate a meeting-scoped JWT token used for WebSocket/WebRTC.
 * @param studioId - The studio ID.
 * @param studioSlug - The studio slug.
 * @param userId - The user ID.
 * @param participantId - The participant ID.
 * @param participantRole - The participant role.
 * @param recordable - Whether the meeting is recordable.
 * @param roomId - The room ID.
 */
export const generateMeetingToken = ({
  studioId,
  studioSlug,
  userId,
  participantId,
  participantRole,
  recordable = false,
  roomId,
}: MeetingTokenPayload): string => {
  const payload: MeetingTokenPayload = {
    studioId,
    studioSlug,
    roomId,
    userId,
    participantId,
    participantRole,
    recordable,
  };

  return jwt.sign(payload, NEXTAUTH_SECRET as string, {
    expiresIn: "1h",
  });
};

/**
 * Verify the meeting-scoped JWT token and return full payload.
 * @param token - The JWT token.
 * @returns The meeting token payload.
 */
export const verifyMeetingToken = (
  token: string
): MeetingTokenPayload | null => {
  try {
    const decoded = jwt.verify(
      token,
      NEXTAUTH_SECRET as string
    ) as MeetingTokenPayload;
    return decoded;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
};
