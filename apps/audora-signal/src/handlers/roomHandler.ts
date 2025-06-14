import { WebSocket } from "ws";
import { logger } from "../utils/logger";
import type { InboundMessage } from "@audora/types";
import {
  addToRoom,
  removeParticipantBySocket,
  broadcastToRoom,
  sendToSocket,
  getRoomParticipants,
  isUserInRoom,
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
  const { studioSlug, userId, participantRole } = meetingToken;

  if (!studioSlug || !userId || !participantRole) {
    sendAndClose(socket, "error", "Missing meeting token fields.");
    return;
  }

  switch (type) {
    case "user:join": {
      const { name } = data;

      if (isUserInRoom(studioSlug, userId)) {
        sendAndClose(socket, "error", "User already in room.");
        return;
      }

      const participant = addToRoom(
        studioSlug,
        socket,
        userId,
        name,
        participantRole
      );

      socket.meta = {
        ...meetingToken,
        socketId: participant.socketId,
      };

      // Notify existing user
      broadcastToRoom(
        studioSlug,
        {
          type: "user:joined",
          data: {
            user: {
              userId,
              name,
              role: participantRole,
              socketId: participant.socketId,
            },
          },
        },
        socket
      );

      sendToSocket(socket, {
        type: "room:ready",
        data: {
          studioSlug,
        },
      });

      const participants = getRoomParticipants(studioSlug);
      if (participants.length > 1) {
        sendToSocket(socket, {
          type: "participants:list",
          data: {
            participants: participants.map((p) => ({
              user: {
                userId: p.userId,
                name: p.name,
                role: p.role,
                socketId: p.socketId,
              },
            })),
          },
        });
      }

      logger.info(`[${studioSlug}] ${participantRole} (${name}) joined room.`);
      break;
    }

    case "user:leave": {
      removeParticipantBySocket(studioSlug, socket);

      // broadcastToRoom(
      //   studioSlug,
      //   {
      //     type: "user:left",
      //     data: {
      //       user: {
      //         userId,
      //         role: participantRole,
      //         socketId: socket.meta?.socketId,
      //       },
      //     },
      //   },
      //   socket
      // );

      logger.info(`[${studioSlug}] ${userId} left the room.`);
      break;
    }

    case "meeting:end": {
      if (participantRole !== "host") {
        sendAndClose(socket, "error", "Only host can end the meeting.");
        return;
      }

      broadcastToRoom(studioSlug, {
        type: "meeting:end",
        data: { studioSlug },
      });

      logger.info(`[${studioSlug}] Host ended the meeting.`);
      break;
    }

    default: {
      logger.warn(`Unhandled message type: ${type}`);
      sendAndClose(socket, "error", `Unknown message type: ${type}`);
      break;
    }
  }
};
