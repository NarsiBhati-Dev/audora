import { WebSocket } from "ws";
import { logger } from "../utils/logger";
import type { Message } from "../types/message-types";

interface SignalingEvent {
  socket: WebSocket;
  message: Message;
}

export const signalingEventHandler = ({ socket, message }: SignalingEvent) => {
  const { type, data } = message;

  switch (type) {
    case "webrtc:offer":
      logger.info(`[SIGNAL] ${type} | ${JSON.stringify(data)}`);
      break;
    case "webrtc:answer":
      logger.info(`[SIGNAL] ${type} | ${JSON.stringify(data)}`);
      break;
    case "webrtc:ice-candidate": {
      logger.info(`[SIGNAL] ${type} | ${JSON.stringify(data)}`);
      break;
    }
    default: {
      logger.warn(`[SIGNAL] Unknown message type: ${type}`);
      break;
    }
  }
};
