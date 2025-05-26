import { WebSocket } from "ws";
import { logger } from "../utils/logger";

export const signalingHandler = (socket: WebSocket) => {
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
