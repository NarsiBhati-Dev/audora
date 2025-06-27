import { logger } from "../utils/logger";
import { verifyMeetingToken } from "./verifyToken";
import type { MeetingTokenPayload } from "./verifyToken";

export const authenticateWebSocket = (
  token: string,
): MeetingTokenPayload | null => {
  try {
    if (!token) {
      logger.error("[authenticateWebSocket] No token provided");
      return null;
    }

    const decoded = verifyMeetingToken(token) as MeetingTokenPayload;

    if (!decoded) {
      logger.error("[authenticateWebSocket] Invalid token");
      return null;
    }

    logger.info(
      `[authenticateWebSocket] ${decoded.studioSlug} ${decoded.participantRole} User authenticated`,
    );
    return decoded;
  } catch (error) {
    logger.error("[authenticateWebSocket] JWT verification failed", error);
    return null;
  }
};
