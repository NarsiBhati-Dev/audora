import { WebSocket } from "ws";
import { logger } from "../utils/logger";
import type { Message } from "../types/message-types";

interface RoomEvent {
  socket: WebSocket;
  message: Message;
  userId: string;
}

export const handleRoomEvent = ({ socket, message, userId }: RoomEvent) => {
  logger.info("Room handler initialized");

  socket.on("message", (data) => {
    logger.info(`Received message: ${data}`);
  });
};
