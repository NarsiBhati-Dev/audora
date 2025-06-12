import { WebSocket } from "ws";
import { logger } from "../utils/logger";
import type { InboundMessage } from "../types/message-types";
import type { MeetingTokenPayload } from "../services/verifyToken";

interface SignalingEvent {
  socket: WebSocket;
  message: InboundMessage;
  meetingToken: MeetingTokenPayload;
}

export const signalingEventHandler = ({
  socket,
  message,
  meetingToken,
}: SignalingEvent) => {
  const { type, data } = message;
  const { studioId, userId, participantRole } = meetingToken;

  switch (type) {
    case "webrtc:offer":
      logger.info(
        `[SIGNAL] ${type} | ${JSON.stringify(data)} | ${studioId} | ${userId} | ${participantRole}`
      );
      break;
    case "webrtc:answer":
      logger.info(
        `[SIGNAL] ${type} | ${JSON.stringify(data)} | ${studioId} | ${userId} | ${participantRole}`
      );
      break;
    case "webrtc:ice-candidate": {
      logger.info(
        `[SIGNAL] ${type} | ${JSON.stringify(data)} | ${studioId} | ${userId} | ${participantRole}`
      );
      break;
    }
    default: {
      logger.warn(
        `[SIGNAL] Unknown message type: ${type} | ${studioId} | ${userId} | ${participantRole}`
      );
      break;
    }
  }
};
