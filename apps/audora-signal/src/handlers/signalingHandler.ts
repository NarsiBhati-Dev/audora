import { WebSocket } from "ws";
import { logger } from "../utils/logger";
import { getRoomParticipants, sendToSocket } from "../rooms/room-manager";
import type { MeetingTokenPayload } from "../services/verifyToken";
import type { InboundMessage } from "@audora/types";

interface SignalingEvent {
  socket: WebSocket;
  message: InboundMessage;
  meetingToken: MeetingTokenPayload;
}

export const signalingEventHandler = ({
  socket,
  message,
  meetingToken,
}: SignalingEvent) => {
  const { type, data } = message;
  const { studioSlug, userId, participantRole } = meetingToken;

  const logPrefix = `[SIGNAL] ${type} | ${studioSlug} | ${userId} | ${participantRole}`;

  switch (type) {
    case "webrtc:offer":
    case "webrtc:answer":
    case "webrtc:ice-candidate": {
      logger.info(`${logPrefix} | ${type}`);

      const { to } = data;
      if (!to) {
        logger.warn(`${logPrefix} | missing 'to' field`);
        return;
      }

      const targetParticipant = getRoomParticipants(studioSlug).find(
        (p) => p.socketId === to
      );

      if (
        !targetParticipant ||
        targetParticipant.socket.readyState !== WebSocket.OPEN
      ) {
        logger.warn(`${logPrefix} | target socket not found or not open ${to}`);
        return;
      }

      const fromSocketId = (socket as any).meta?.socketId;
      if (!fromSocketId) {
        logger.warn(`${logPrefix} | missing sender socketId`);
        return;
      }

      const forwardMessage = {
        type,
        data: {
          ...data,
          from: fromSocketId,
        },
      };

      sendToSocket(targetParticipant.socket, forwardMessage);
      break;
    }

    default: {
      logger.warn(`${logPrefix} | Unknown message type`);
      break;
    }
  }
};
