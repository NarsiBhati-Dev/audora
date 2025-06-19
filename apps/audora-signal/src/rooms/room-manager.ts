// rooms/room-manager.ts
import { WebSocket } from "ws";
import { logger } from "../utils/logger";

export type Role = "host" | "guest";

export interface Participant {
  userId: string;
  name: string;
  role: Role;
  socketId: string;
  socket: WebSocket;
}

export interface Room {
  roomId: string;
  participants: Participant[];
}

const rooms = new Map<string, Room>();

export const addToRoom = (
  roomId: string,
  socket: WebSocket,
  userId: string,
  name: string,
  role: Role
): Participant | null => {
  const room = rooms.get(roomId) ?? { roomId, participants: [] };

  const hostExists = room.participants.some((p) => p.role === "host");
  const guestCount = room.participants.filter((p) => p.role === "guest").length;

  // Enforce role limits
  if (role === "host" && hostExists) {
    logger.warn(`[${roomId}] Host already exists. Cannot add another host.`);
    return null;
  }

  if (role === "guest" && guestCount >= 3) {
    logger.warn(`[${roomId}] Max guests reached. Cannot add ${name}.`);
    return null;
  }

  const socketId = crypto.randomUUID();

  const participant: Participant = {
    userId,
    name,
    role,
    socketId,
    socket,
  };

  room.participants.push(participant);
  rooms.set(roomId, room);

  logger.info(`[${roomId}] ${role} ${name} joined.`);

  return participant;
};

export const getRoomParticipants = (roomId: string): Participant[] => {
  const room = rooms.get(roomId);
  if (!room) return [];
  return room.participants;
};

export const removeParticipantBySocket = (
  roomId: string,
  socket: WebSocket
) => {
  const room = rooms.get(roomId);
  if (!room) return;

  room.participants = room.participants.filter((p) => p.socket !== socket);

  if (room.participants.length === 0) {
    rooms.delete(roomId);
    logger.info(`no participants in [${roomId}] room deleted`);
  }
};

export const isUserInRoom = (roomId: string, userId: string): boolean => {
  const room = rooms.get(roomId);
  if (!room) return false;
  return room.participants.some((p) => p.userId === userId);
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
  const sockets = room.participants.map((p) => p.socket);
  for (const sock of sockets) {
    if (sock !== excludeSocket && sock?.readyState === WebSocket.OPEN) {
      sock.send(JSON.stringify(message));
    }
  }
};

export const removeRoom = (roomId: string) => {
  rooms.delete(roomId);
  logger.info(`[${roomId}] room deleted`);
};
