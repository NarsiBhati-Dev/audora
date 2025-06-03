import { WebSocketServer } from "ws";

import { logger } from "../utils/logger";
import { PORT } from "../config";
import type { Message } from "../types/message-types";

export const setupSignalingServer = (wss: WebSocketServer) => {
  wss.on("connection", (socket, request) => {
    const url = request.url;
    const token = url?.split("t=")[1];

    if (!token) {
      logger.error("Connection request missing token");
      socket.close();
      return;
    }

    logger.info(`User connected: ${token}`);

    // Handle incoming messages
    socket.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString()) as Message;
        logger.info(`Received message: ${message}`);

        switch (message.type) {
          case "user:connect":
          case "user:disconnect":
            logger.info(`${message.type} received: ${message.data}`);
            break;
          case "webrtc:offer":
          case "webrtc:answer":
          case "webrtc:ice-candidate":
            logger.info(`${message.type} received: ${message.data}`);
            break;
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
    logger.info(`Signaling server running on ws://localhost:${PORT}`);
  });
};
