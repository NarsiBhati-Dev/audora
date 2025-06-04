import { WebSocketServer, WebSocket } from "ws";
import { logger } from "../utils/logger";
import { PORT } from "../config";
import type { Message } from "../types/message-types";
import { roomEventHandler } from "./roomHandler";
import { signalingEventHandler } from "./signalingHandler";

export const setupSignalingServer = (wss: WebSocketServer) => {
  wss.on("connection", (socket, request) => {
    const url = request.url;
    const token = url?.split("t=")[1];

    logger.info(`Connection established. Token: ${token || "N/A"}`);

    socket.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString()) as Message;

        if (message.type === "user:join") {
          const { role, studioId, userId, name } = message.data;

          // Reject guest connections without a token
          if (role === "guest" && !token) {
            logger.error("Guest connection missing token");
            socket.close();
            return;
          }

          logger.info(
            `Connection established. Role: ${role}, Token: ${token || "N/A"}`
          );

          // Store metadata on socket for disconnect cleanup
          (socket as any).meta = { studioId, userId };
        }

        logger.info(`Received message: ${JSON.stringify(message, null, 2)}`);

        switch (message.type) {
          case "user:join":
          case "user:leave":
            roomEventHandler({ socket, message });
            break;

          case "webrtc:offer":
          case "webrtc:answer":
          case "webrtc:ice-candidate":
            signalingEventHandler({ socket, message });
            break;

          default:
            logger.warn(
              `Unknown message type: ${JSON.stringify(message, null, 2)}`
            );
        }
      } catch (error) {
        logger.error("Invalid message format", error);
      }
    });

    socket.on("close", () => {
      logger.info("Socket closed");

      const meta = (socket as any).meta;
      if (!meta) return;

      const { studioId, userId, role } = meta;

      roomEventHandler({
        socket,
        message: {
          type: "user:leave",
          data: { studioId, userId, role },
        },
      });

      logger.info(`[${studioId}] User ${userId} disconnected`);
    });
  });

  wss.on("listening", () => {
    logger.info(`Signaling server running at ws://localhost:${PORT}`);
  });
};
