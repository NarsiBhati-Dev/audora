import { WebSocketServer } from "ws";

import { logger } from "../utils/logger";
import { PORT } from "../config";

export const connectionHandler = (wss: WebSocketServer) => {
  wss.on("connection", (socket, request) => {
    const url = request.url;
    if (!url) {
      logger.error("Connection request missing URL");
      socket.close();
      return;
    }

    logger.info(`User connected`);

    // Handle incoming messages
    socket.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());

        switch (message.type) {
          default:
            logger.warn(`Unknown message type received: ${message.type}`);
        }
      } catch (error) {
        logger.error("Invalid message format", error);
      }
    });

    // Handle disconnection
    socket.on("close", () => {
      logger.info(`User disconnected`);
    });
  });

  wss.on("listening", () => {
    logger.info(`WebSocket server is running on ws://localhost:${PORT}`);
  });
};
