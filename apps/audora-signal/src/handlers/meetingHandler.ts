import type { WebSocket } from "ws";
import { broadcastToRoom, removeRoom } from "../rooms/room-manager";
import type { InboundMessage } from "@audora/types";
import type { MeetingTokenPayload } from "../services/verifyToken";

export const meetingHandler = ({
  socket,
  meetingToken,
  message,
}: {
  socket: WebSocket;
  meetingToken: MeetingTokenPayload;
  message: InboundMessage;
}) => {
  const { type, data } = message;
  const { studioSlug } = meetingToken;

  switch (type) {
    case "mic:toggle": {
      const { micOn, socketId } = data;
      broadcastToRoom(
        studioSlug,
        {
          type: "mic:toggle",
          data: { micOn, socketId },
        },
        socket
      );
      break;
    }
    case "cam:toggle": {
      const { camOn, socketId } = data;
      broadcastToRoom(
        studioSlug,
        {
          type: "cam:toggle",
          data: { camOn, socketId },
        },
        socket
      );
      break;
    }

    default: {
      console.warn(`[meetingHandler] Unhandled type: ${type}`);
      break;
    }
  }
};
