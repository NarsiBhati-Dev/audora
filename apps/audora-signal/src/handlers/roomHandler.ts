import { WebSocket } from "ws";
import { logger } from "../utils/logger";
import type { InboundMessage } from "../types/message-types";
import {
  addParticipant,
  removeParticipantBySocket,
  broadcastToRoom,
  sendToSocket,
  getParticipants,
  isUserInRoom,
  getRoomStats,
  updateParticipantLastSeen,
} from "../rooms/room-manager";
import { sendAndClose } from "../utils/sendAndClose";
import type { MeetingTokenPayload } from "../services/verifyToken";

interface SocketWithMeta extends WebSocket {
  meta?: MeetingTokenPayload & { socketId: string };
}

interface RoomEvent {
  socket: SocketWithMeta;
  message: InboundMessage;
  meetingToken: MeetingTokenPayload;
}

export const roomEventHandler = async ({
  socket,
  message,
  meetingToken,
}: RoomEvent) => {
  const { type, data } = message;
  const { studioId, userId, participantRole } = meetingToken;

  // Update last seen timestamp for all messages
  if (socket.meta?.socketId) {
    updateParticipantLastSeen(studioId, socket.meta.socketId);
  }

  switch (type) {
    case "user:join": {
      const { name } = data;
      if (!studioId || !userId || !participantRole || !name) {
        sendAndClose(socket, "error", "Missing required fields.");
        return;
      }

      // Check if user is already in room
      if (isUserInRoom(studioId, userId)) {
        sendAndClose(socket, "error", "User is already in the room.");
        return;
      }

      try {
        // Add participant to room
        const participant = addParticipant(
          studioId,
          socket,
          userId,
          name,
          participantRole
        );

        // Store socket metadata
        socket.meta = {
          ...meetingToken,
          socketId: participant.socketId,
        };

        // Broadcast to others (excluding new joiner)
        broadcastToRoom(
          studioId,
          {
            type: "user:joined",
            data: {
              userId,
              name,
              role: participantRole,
              socketId: participant.socketId,
            },
          },
          socket
        );

        // Send room stats to the new user
        const roomStats = getRoomStats(studioId);
        if (roomStats) {
          sendToSocket(socket, {
            type: "room:stats",
            data: roomStats,
          });
        }

        // Send participant list to the new user
        const participants = getParticipants(studioId, socket);
        if (participants.length > 0) {
          sendToSocket(socket, {
            type: "participants:list",
            data: {
              participants: participants.map((p) => ({
                userId: p.userId,
                name: p.name,
                role: p.role,
                socketId: p.socketId,
              })),
            },
          });
        }

        logger.info(
          `[${studioId}] ${participantRole} (${name}) joined room successfully`
        );
      } catch (error) {
        logger.error(`Error adding participant to room: ${error}`);
        sendAndClose(socket, "error", "Failed to join room.");
      }
      break;
    }

    case "user:leave": {
      try {
        removeParticipantBySocket(studioId, socket);

        // Broadcast to others
        broadcastToRoom(
          studioId,
          {
            type: "user:left",
            data: { userId },
          },
          socket
        );

        // Send updated room stats to remaining participants
        const roomStats = getRoomStats(studioId);
        if (roomStats) {
          broadcastToRoom(studioId, {
            type: "room:stats",
            data: roomStats,
          });
        }

        logger.info(`[${studioId}] User ${userId} left room successfully`);
      } catch (error) {
        logger.error(`Error removing participant from room: ${error}`);
      }
      break;
    }

    case "meeting:end": {
      try {
        // Only host can end the meeting
        if (participantRole !== "host") {
          sendAndClose(socket, "error", "Only host can end the meeting.");
          return;
        }

        // Broadcast meeting end to all participants
        broadcastToRoom(studioId, {
          type: "meeting:end",
          data: { studioId },
        });

        logger.info(`[${studioId}] Meeting ended by host ${userId}`);
      } catch (error) {
        logger.error(`Error ending meeting: ${error}`);
        sendAndClose(socket, "error", "Failed to end meeting.");
      }
      break;
    }

    default: {
      logger.warn(`Unhandled message type: ${type}`);
      sendAndClose(socket, "error", `Unknown message type: ${type}`);
      break;
    }
  }
};
