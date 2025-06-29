import { logger } from "../utils/logger";
import { sendAndClose } from "../utils/sendAndClose";
import {
  addToRoom,
  removeParticipantBySocket,
  broadcastToRoom,
  sendToSocket,
  getRoomParticipants,
  isUserInRoom,
  type Participant,
  getRoom,
} from "../rooms/room-manager";

import type { InboundMessage } from "@audora/types";
import type { SocketWithMeta } from "../types/socket";
import type { MeetingTokenPayload } from "../services/verifyToken";

interface RoomEvent {
  socket: SocketWithMeta;
  message: InboundMessage;
  meetingToken: MeetingTokenPayload;
}

const toClientUser = (p: {
  userId: string;
  name: string;
  role: string;
  socketId: string;
  micOn: boolean;
  camOn: boolean;
}) => ({
  userId: p.userId,
  name: p.name,
  role: p.role,
  socketId: p.socketId,
  micOn: p.micOn,
  camOn: p.camOn,
});

export const roomEventHandler = async ({
  socket,
  message,
  meetingToken,
}: RoomEvent): Promise<void> => {
  const { type, data } = message;
  const { studioSlug, userId, participantRole } = meetingToken;

  if (!studioSlug || !userId || !participantRole) {
    sendAndClose(socket, "error", "Missing meeting token fields.");
    return;
  }

  switch (type) {
    case "user:join": {
      const { name, micOn, camOn } = data as {
        name: string;
        micOn: boolean;
        camOn: boolean;
      };

      if (isUserInRoom(studioSlug, userId)) {
        sendAndClose(socket, "error", "User already in room.");
        return;
      }

      const participant = addToRoom(
        studioSlug,
        socket,
        userId,
        name,
        participantRole,
        micOn,
        camOn
      );

      if (!participant) {
        sendAndClose(socket, "error", "Failed to add participant to room.");
        return;
      }

      socket.meta = {
        ...meetingToken,
        socketId: participant?.socketId ?? "",
      };

      // Notify others about new join
      broadcastToRoom(
        studioSlug,
        {
          type: "user:joined",
          data: { user: toClientUser(participant) },
        },
        socket
      );

      const room = getRoom(studioSlug);

      // Notify the newly joined user
      sendToSocket(socket, {
        type: "room:ready",
        data: {
          selfSocketId: socket.meta?.socketId,
          projectId: room?.projectId ?? null,
          trackId: room?.trackId ?? null,
        },
      });

      // Send the list of existing participants
      const participants = getRoomParticipants(studioSlug);
      if (participants.length > 1) {
        sendToSocket(socket, {
          type: "participants:list",
          data: {
            participants: participants
              .filter((p) => p.userId !== userId)
              .map((p) => ({
                user: toClientUser(p),
              })),
          },
        });
      }

      logger.info(
        `[${studioSlug}] ${participantRole} (${name}) joined the room.`
      );
      break;
    }

    case "user:leave": {
      const socketId = socket.meta?.socketId ?? "";

      removeParticipantBySocket(studioSlug, socket);

      broadcastToRoom(
        studioSlug,
        {
          type: "user:left",
          data: {
            user: {
              userId,
              role: participantRole,
              socketId,
              name: "",
            },
          },
        },
        socket
      );

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
      logger.warn(`[${studioSlug}] Unhandled message type: ${type}`);
      sendAndClose(socket, "error", `Unknown message type: ${type}`);
      break;
    }
  }
};
