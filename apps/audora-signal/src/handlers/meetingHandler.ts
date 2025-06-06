import type { WebSocket } from "ws";
import { createRoomManager, RoomUtils } from "../rooms/room-manager";
import type { Message } from "../types/message-types";

export const meetingHandler = ({
  socket,
  message,
}: {
  socket: WebSocket;
  message: Message;
}) => {
  const { type, data } = message;

  switch (type) {
    case "meeting:end": {
      const { studioId } = data;
      const room = createRoomManager().getRoom(studioId);
      if (!room) return;
      RoomUtils.broadcast(
        room,
        { type: "meeting:end", data: { studioId } },
        socket
      );
      break;
    }
  }
};
