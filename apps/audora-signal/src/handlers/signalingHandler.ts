import { WebSocket } from "ws";
import { logger } from "../utils/logger";
import type { Message } from "../types/message-types";

interface SignalingEvent {
  socket: WebSocket;
  message: Message;
  userId: string;
}

export const handleSignalingEvent = (socket: WebSocket) => {
  logger.info("Signaling handler initialized");

  socket.on("message", (data) => {
    logger.info(`Received message: ${data}`);

    const message = JSON.parse(data.toString());

    switch (message.type) {
      default:
        logger.warn(`Unknown message type received: ${message.type}`);
    }
  });
};
