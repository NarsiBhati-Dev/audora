import { WebSocketServer, WebSocket } from "ws";
import { logger } from "../utils/logger";
import { PORT } from "../config";
import type { Message } from "../types/message-types";
import { roomEventHandler } from "./roomHandler";
import { signalingEventHandler } from "./signalingHandler";
import { sendAndClose } from "../utils/sendAndClose";
// import { isValidGuestToken, isValidHost } from "../utils/auth";
import { createRoomManager, RoomUtils } from "../rooms/room-manager";

interface SocketWithMeta extends WebSocket {
  meta?: {
    studioId: string;
    userId: string;
    role: "host" | "guest";
  };
}

export const setupSignalingServer = (wss: WebSocketServer) => {
  wss.on("connection", (socket: SocketWithMeta, request) => {
    const url = request.url ?? "";
    const parsedUrl = new URL(`http://localhost${url}`);
    const token = parsedUrl.searchParams.get("t");

    logger.info(`New connection. Token: ${token || "N/A"}`);

    socket.on("message", async (data) => {
      let message: Message;

      try {
        message = JSON.parse(data.toString()) as Message;
      } catch (error) {
        logger.error("Invalid message format", error);
        sendAndClose(socket, "error", "Invalid message format");
        return;
      }

      logger.info(`Message received: ${JSON.stringify(message, null, 2)}`);

      const { type } = message;

      switch (type) {
        case "user:join": {
          const { role, studioId, userId } = message.data;

          if (role === "guest") {
            if (!token) {
              logger.warn("Missing token.");
              sendAndClose(socket, "error", "Missing token.");
              return;
            }
            // const isValid = await isValidGuestToken(token, studioId);
            // if (!isValid) {
            //   logger.warn("Invalid token.");
            //   sendAndClose(socket, "error", "Invalid token.");
            //   return;
            // }
          }

          if (role === "host") {
            // const isValid = await isValidHost(userId, studioId);
            // if (!isValid) {
            //   logger.warn("Unauthorized host.");
            //   sendAndClose(socket, "error", "Unauthorized host.");
            //   return;
            // }
          }

          socket.meta = { studioId, userId, role };

          logger.info(
            `Join request → Role: ${role}, StudioID: ${studioId}, UserID: ${userId}, Token: ${token}`
          );

          roomEventHandler({ socket, message });
          break;
        }

        case "user:leave": {
          roomEventHandler({ socket, message });
          break;
        }

        case "webrtc:offer":
        case "webrtc:answer":
        case "webrtc:ice-candidate": {
          signalingEventHandler({ socket, message });
          break;
        }
        case "meeting:end": {
          roomEventHandler({ socket, message });
          break;
        }

        default: {
          logger.warn(`Unhandled message type: ${type}`);
          break;
        }
      }
    });

    socket.on("close", () => {
      const meta = (socket as any).meta;

      if (!meta) {
        logger.warn("Socket closed but no metadata found. Skipping cleanup.");
        return;
      }

      const { studioId, userId, role } = meta;
      const room = createRoomManager().getRoom(studioId);

      if (!room) {
        logger.warn(
          `[${studioId}] No room found on socket close. Skipping removal for user ${userId}.`
        );
        return;
      }

      const isParticipant = RoomUtils.isUserInRoom(room, userId);

      if (!isParticipant) {
        logger.warn(
          `[${studioId}] User ${userId} was not part of the room. Skipping leave handling.`
        );
        return;
      }

      logger.info(`[${studioId}] ${role} (${userId}) connection closed`);

      roomEventHandler({
        socket,
        message: {
          type: "user:leave",
          data: { studioId, userId, role },
        },
      }).catch((err) => {
        logger.error(`Error handling user leave for ${userId}:`, err);
      });
    });
  });

  wss.on("listening", () => {
    logger.info(`Signaling server running at ws://localhost:${PORT}`);
  });
};
