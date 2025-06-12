import { WebSocketServer, WebSocket } from "ws";
import { logger } from "../utils/logger";
import { PORT } from "../config";
import type { InboundMessage } from "../types/message-types";
import { roomEventHandler } from "./roomHandler";
import { signalingEventHandler } from "./signalingHandler";
import { sendAndClose } from "../utils/sendAndClose";
import { removeParticipantBySocket } from "../rooms/room-manager";
import { authenticateWebSocket } from "../services/auth";
import { getToken } from "../services/getToken";
import type { MeetingTokenPayload } from "../services/verifyToken";

interface SocketWithMeta extends WebSocket {
  meta?: MeetingTokenPayload & { socketId: string };
}

export const setupSignalingServer = (wss: WebSocketServer) => {
  wss.on("connection", (socket: SocketWithMeta, request) => {
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
      try {
        const message = JSON.parse(data.toString()) as InboundMessage;

        switch (message.type) {
          case "user:join":
          case "user:leave":
          case "meeting:end":
            roomEventHandler({ socket, message, meetingToken });
            break;

          case "webrtc:offer":
          case "webrtc:answer":
          case "webrtc:ice-candidate":
            signalingEventHandler({ socket, message, meetingToken });
            break;

          default: {
            logger.warn(`Unknown message type received: ${message.type}`);
            sendAndClose(
              socket,
              "error",
              `Unknown message type: ${message.type}`
            );
            break;
          }
        }
      } catch (error) {
        logger.error(`Error handling message: ${error}`);
        sendAndClose(socket, "error", "Internal server error");
        return;
      }
    });

    socket.on("close", () => {
      if (!meetingToken) {
        logger.warn("Socket closed but no metadata found. Skipping cleanup.");
        return;
      }

      const { studioId, userId, participantRole } = meetingToken;

      try {
        // Remove participant from room
        removeParticipantBySocket(studioId, socket);

        logger.info(
          `[${studioId}] ${participantRole} (${userId}) connection closed`
        );

        // Handle user leave event
        roomEventHandler({
          socket,
          message: {
            type: "user:leave",
            data: { studioId, userId, participantRole },
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

  // Set up periodic ping to all clients
  setInterval(() => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.ping();
      }
    });
  }, 30000); // Every 30 seconds
};
