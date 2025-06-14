import type { WebSocket } from "ws";
import { broadcastToRoom } from "../rooms/room-manager";
import type { InboundMessage } from "@audora/types";

export const meetingHandler = ({
  socket,
  message,
}: {
  socket: WebSocket;
  message: InboundMessage;
}) => {
  const { type, data } = message;

  switch (type) {
    case "meeting:end": {
      broadcastToRoom(data.studioSlug, {
        type: "meeting:end",
        data: { studioSlug: data.studioSlug },
      });

      console.log(`[meeting:end] Broadcasted to room ${data.studioSlug}`);
      break;
    }

    default: {
      console.warn(`[meetingHandler] Unhandled type: ${type}`);
      break;
    }
  }
};
