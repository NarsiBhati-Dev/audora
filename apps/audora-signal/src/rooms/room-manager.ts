// rooms/room-manager.ts
import { WebSocket } from "ws";
import { logger } from "../utils/logger";

export type Role = "host" | "guest";

export interface Participant {
  userId: string;
  name: string;
  role: Role;
  micOn: boolean;
  camOn: boolean;
  socketId: string;
  socket: WebSocket;
}

export interface Room {
  roomId: string;
  projectId?: string | null;
  trackId?: string | null;
  recordingStatus?: boolean;
  participants: Participant[];
}

const rooms = new Map<string, Room>();

export const addToRoom = (
  roomId: string,
  socket: WebSocket,
  userId: string,
  name: string,
  role: Role,
  micOn: boolean,
  camOn: boolean
): Participant | null => {
  const room = rooms.get(roomId) ?? { roomId, participants: [] };

  const hostExists = room.participants.some((p) => p.role === "host");
  const guestCount = room.participants.filter((p) => p.role === "guest").length;

  // Enforce role limits
  if (role === "host" && hostExists) {
    logger.warn(`[${roomId}] Host already exists. Cannot add another host.`);
    return null;
  }

  // only 2 guests allowed and 1 host allowed
  if (role === "guest" && guestCount >= 2) {
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
    micOn,
    camOn,
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

export const getRoom = (roomId: string): Room | undefined => {
  return rooms.get(roomId);
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

export const addProjectId = (
  roomId: string,
  socket: WebSocket,
  projectId: string
) => {
  const room = rooms.get(roomId);
  if (!room) return;
  room.projectId = projectId;
  rooms.set(roomId, room);
  logger.info(`[${roomId}] project id added to room`);
  broadcastToRoom(roomId, {
    type: "project-id",
    data: { projectId },
    excludeSocket: socket,
  });
};

export const addTrackId = (
  roomId: string,
  socket: WebSocket,
  trackId: string
) => {
  const room = rooms.get(roomId);
  if (!room) return;
  room.trackId = trackId;
  rooms.set(roomId, room);
  logger.info(`[${roomId}] track id added to room`);
  broadcastToRoom(roomId, {
    type: "track-id",
    data: { trackId },
    excludeSocket: socket,
  });
};

export const updateRecordingStatus = (
  roomId: string,
  socket: WebSocket,
  recordingStatus: boolean
) => {
  const room = rooms.get(roomId);
  if (!room) return;
  room.recordingStatus = recordingStatus;
  rooms.set(roomId, room);
  logger.info(`[${roomId}] recording status updated to ${recordingStatus}`);
  broadcastToRoom(roomId, {
    type: "recording-status",
    data: { recordingStatus },
    excludeSocket: socket,
  });
};
