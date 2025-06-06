import { WebSocket } from "ws";
import { logger } from "../utils/logger";
import type { Message } from "../types/message-types";
import { createRoomManager, RoomUtils } from "../rooms/room-manager";
import type { Room } from "../rooms/room-manager";
import { sendAndClose } from "../utils/sendAndClose";

const roomManager = createRoomManager();

interface RoomEvent {
  socket: WebSocket;
  message: Message;
}

export const roomEventHandler = async ({ socket, message }: RoomEvent) => {
  const { type, data } = message;

  switch (type) {
    case "user:join": {
      const { role, studioId, userId, name = "" } = data;

      if (!studioId || !userId || !role) {
        sendAndClose(socket, "error", "Missing required fields.");
        return;
      }

      let room: Room | undefined;

      if (role === "host") {
        room = roomManager.getOrCreateRoom(studioId);
        logger.info(`[${studioId}] Host (${name}) created or joined room`);
      } else if (role === "guest") {
        room = roomManager.getRoom(studioId);

        if (!room) {
          logger.warn(`Host has not started the room: ${studioId}`);

          sendAndClose(
            socket,
            "error",
            "The host hasn't started the room yet."
          );
          return;
        }
      } else {
        logger.warn(`Unknown role received: ${role}`);
        sendAndClose(socket, "error", "Unknown role.");
        return;
      }

      // Add participant to the room
      const [updatedRoom] = RoomUtils.addParticipant(room, socket, {
        userId,
        name,
        role,
      });

      roomManager.updateRoom(studioId, () => updatedRoom);

      // Broadcast to others (excluding new joiner)
      RoomUtils.broadcast(
        updatedRoom,
        {
          type: "user:joined",
          data: { userId, name, role },
        },
        socket
      );

      // Send participant list to the new user
      if (updatedRoom.participants.size > 1) {
        RoomUtils.broadcastToSpecificSocket(
          {
            type: "participants:list",
            data: {
              participants: RoomUtils.serializeParticipants(
                updatedRoom,
                socket
              ),
            },
          },
          socket
        );
      }

      logger.info(`[${studioId}] ${role} (${name}) connected`);
      break;
    }

    case "user:leave": {
      const { studioId, userId } = data;

      const room = roomManager.getRoom(studioId);
      if (!room) {
        logger.warn(`[${studioId}] Leave attempted, but room not found`);
        break;
      }

      const updatedRoom = RoomUtils.removeParticipantBySocket(room, socket);
      roomManager.updateRoom(studioId, () => updatedRoom);
      roomManager.removeRoomIfEmpty(studioId);

      logger.info(`[${studioId}] User ${userId} disconnected`);

      RoomUtils.broadcast(
        updatedRoom,
        {
          type: "user:left",
          data: { userId },
        },
        socket
      );

      break;
    }

    default: {
      logger.warn(`Unhandled message type: ${type}`);
      sendAndClose(socket, "error", `Unknown message type: ${type}`);
      break;
    }
  }
};
