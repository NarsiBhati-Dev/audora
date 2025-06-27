import { WebSocketServer, WebSocket } from "ws";
import { logger } from "../utils/logger";
import { PORT } from "../config";
import type { InboundMessage } from "@audora/types";
import { roomEventHandler } from "./roomHandler";
import { webRTCHandler } from "./webRTCHandler";
import { sendAndClose } from "../utils/sendAndClose";
import { removeParticipantBySocket } from "../rooms/room-manager";
import { authenticateWebSocket } from "../services/auth";
import { getToken } from "../services/getToken";
import { meetingHandler } from "./meetingHandler";

export const setupSignalingServer = (wss: WebSocketServer) => {
  wss.on("connection", (socket: WebSocket, request) => {
    const url = request.url;

    if (!url) {
      logger.error("Connection request missing URL");
      socket.close();
      return;
    }

    const token = getToken(url);
    const meetingToken = authenticateWebSocket(token);

    if (!meetingToken) {
      logger.warn("Unauthorized WebSocket connection attempt");
      socket.close();
      return;
    }

    socket.on("message", (data) => {
      let message: InboundMessage;

      try {
        message = JSON.parse(data.toString());
      } catch (error) {
        logger.error("Invalid JSON received:", data.toString());
        sendAndClose(socket, "error", "Malformed message: Invalid JSON format");
        return;
      }

      if (typeof message !== "object" || typeof message.type !== "string") {
        logger.warn("Invalid message structure:", message);
        sendAndClose(socket, "error", "Invalid message format.");
        return;
      }

      try {
        switch (message.type) {
          case "user:join":
          case "user:leave":
          case "meeting:end":
            roomEventHandler({ socket, message, meetingToken });
            break;

          case "webrtc:offer":
          case "webrtc:answer":
          case "webrtc:ice-candidate":
            webRTCHandler({ socket, message, meetingToken });
            break;

          case "mic:toggle":
          case "cam:toggle":
          case "project-id":
          case "track-id":
          case "recording:start":
          case "recording:stop":
            meetingHandler({ socket, message, meetingToken });
            break;

          default:
            logger.warn(`Unknown message type received: ${message.type}`);
            sendAndClose(
              socket,
              "error",
              `Unknown message type: ${message.type}`,
            );
        }
      } catch (error) {
        logger.error(
          `Error handling message of type "${message?.type}":`,
          error,
        );
        sendAndClose(socket, "error", "Internal server error");
      }
    });

    socket.on("close", () => {
      const { studioSlug, userId, participantRole } = meetingToken;

      try {
        // removeParticipantBySocket(studioSlug, socket);

        logger.info(
          `[${studioSlug}] ${participantRole} (${userId}) connection closed`,
        );

        // Trigger leave logic
        roomEventHandler({
          socket,
          message: {
            type: "user:leave",
            data: { userId },
          },
          meetingToken,
        }).catch((err) => {
          logger.error(`Error handling user leave for ${userId}:`, err);
        });
      } catch (error) {
        logger.error(`Error during socket cleanup for ${userId}:`, error);
      }
    });

    socket.on("error", (error) => {
      logger.error(`WebSocket error for user ${meetingToken.userId}:`, error);
      socket.close();
    });
  });

  wss.on("listening", () => {
    logger.info(`Signaling server running at ws://localhost:${PORT}`);
  });
};
