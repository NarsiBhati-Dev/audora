import { WebSocket } from "ws";
import { getRoomParticipants, sendToSocket } from "../rooms/room-manager";
import { logger } from "../utils/logger";
import type { InboundMessage } from "@audora/types";
import type { MeetingTokenPayload } from "../services/verifyToken";
import type { SocketWithMeta } from "../types/socket";

export const webRTCHandler = ({
  socket,
  message,
  meetingToken,
}: {
  socket: SocketWithMeta;
  message: InboundMessage;
  meetingToken: MeetingTokenPayload;
}) => {
  const { type, data } = message;
  const { studioSlug, userId, participantRole } = meetingToken;
  const logPrefix = `[SIGNAL] ${type} | ${studioSlug} | ${participantRole}`;

  // if (
  //   type === "webrtc:offer" ||
  //   type === "webrtc:answer" ||
  //   type === "webrtc:ice-candidate"
  // ) {
  //   const signalingData = data as {
  //     to: string;
  //     from?: string;
  //     sdp?: {
  //       type: "offer" | "answer";
  //       sdp: string;
  //     };
  //     candidate?: {
  //       candidate: string;
  //       sdpMid?: string | null;
  //       sdpMLineIndex?: number;
  //     };
  //   };

  const { to } = data as { to: string };

  if (!to) {
    logger.warn(`${logPrefix} | missing 'to' field`);
    return;
  }

  const target = getRoomParticipants(studioSlug).find((p) => p.socketId === to);

  if (!target || target.socket.readyState !== WebSocket.OPEN) {
    logger.warn(`${logPrefix} | target socket not found or not open ${to}`);
    return;
  }

  const fromSocketId = socket.meta?.socketId;
  if (!fromSocketId) {
    logger.warn(`${logPrefix} | missing sender socketId`);
    return;
  }

  sendToSocket(target.socket, {
    type,
    data: {
      ...data,
      from: fromSocketId,
    },
  });

  logger.info(`${logPrefix} | forwarded to ${to}`);
  // } else {
  //   logger.warn(`${logPrefix} | Unknown signaling type`);
  // }
};
