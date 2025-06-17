// rooms/room-manager.ts
import { WebSocket } from "ws";
import { logger } from "../utils/logger";

export type Role = "host" | "guest";

interface Participant {
  userId: string;
  name: string;
  role: Role;
  socketId: string;
  socket: WebSocket;
}

interface Room {
  roomId: string;
  host?: Participant;
  guest?: Participant;
}

const rooms = new Map<string, Room>();

export const addToRoom = (
  roomId: string,
  socket: WebSocket,
  userId: string,
  name: string,
  role: Role
): Participant => {
  const room = rooms.get(roomId) ?? { roomId };
  const socketId = crypto.randomUUID();

  const participant: Participant = {
    userId,
    name,
    role,
    socketId,
    socket,
  };

  if (role === "host") {
    room.host = participant;
  } else {
    room.guest = participant;
  }

  rooms.set(roomId, room);
  return participant;
};

export const getRoomParticipants = (roomId: string): Participant[] => {
  const room = rooms.get(roomId);
  if (!room) return [];
  return [room.host, room.guest].filter(Boolean) as Participant[];
};

export const removeParticipantBySocket = (
  roomId: string,
  socket: WebSocket
) => {
  const room = rooms.get(roomId);
  if (!room) return;

  if (room.host?.socket === socket) room.host = undefined;
  if (room.guest?.socket === socket) room.guest = undefined;

  if (room.host === undefined && room.guest === undefined) {
    rooms.delete(roomId);
    logger.info(`[${roomId}] Room deleted`);
  }
};

export const isUserInRoom = (roomId: string, userId: string): boolean => {
  const room = rooms.get(roomId);
  if (!room) return false;
  return room.host?.userId === userId || room.guest?.userId === userId;
};

export const sendToSocket = (socket: WebSocket, message: any) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    return true;
  }
  return false;
};

export const broadcastToRoom = (
  roomId: string,
  message: any,
  excludeSocket?: WebSocket
) => {
  const room = rooms.get(roomId);
  if (!room) return;
  const sockets = [room.host?.socket, room.guest?.socket].filter(Boolean);
  for (const sock of sockets) {
    if (sock !== excludeSocket && sock?.readyState === WebSocket.OPEN) {
      sock.send(JSON.stringify(message));
    }
  }
};
