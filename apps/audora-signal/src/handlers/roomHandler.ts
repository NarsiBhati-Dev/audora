import { WebSocket } from "ws";
import { logger } from "../utils/logger";
import type { Message } from "../types/message-types";
import { createRoomManager, RoomUtils } from "../rooms/room-manager";
import type { Room } from "../rooms/room-manager";

const roomManager = createRoomManager();

interface RoomEvent {
  socket: WebSocket;
  message: Message;
}

export const roomEventHandler = ({ socket, message }: RoomEvent) => {
  const { type, data } = message;

  switch (type) {
    case "user:join": {
      const { role, studioId, userId, name } = data;

      let room: Room | undefined;

      if (role === "host") {
        // Host can create room
        room = roomManager.getOrCreateRoom(studioId);
      } else if (role === "guest") {
        // Guest can only join existing room
        room = roomManager.getRoom(studioId);
        if (!room) {
          logger.warn(`Guest attempted to join non-existent room: ${studioId}`);
          socket.send(
            JSON.stringify({
              type: "error",
              data: { message: "Room does not exist." },
            })
          );
          socket.close();
          return;
        }
      } else {
        logger.warn(`Unknown role: ${role}`);
        socket.close();
        return;
      }

      const [updatedRoom] = RoomUtils.addParticipant(room, socket, {
        userId,
        name: name || "",
        role,
      });

      roomManager.updateRoom(studioId, () => updatedRoom);

      logger.info(`[${studioId}] ${role} (${name}) connected`);

      if (RoomUtils.getParticipantCount(updatedRoom) === 2) {
        RoomUtils.broadcast(updatedRoom, {
          type: "room:ready",
          data: { studioId },
        });
      }

      break;
    }

    case "user:leave": {
      const { studioId, userId } = data;

      const room = roomManager.getRoom(studioId);
      if (!room) break;

      const updatedRoom = RoomUtils.removeParticipantBySocket(room, socket);
      roomManager.updateRoom(studioId, () => updatedRoom);
      roomManager.removeRoomIfEmpty(studioId);

      logger.info(`[${studioId}] user ${userId} disconnected`);

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
      break;
    }
  }
};
