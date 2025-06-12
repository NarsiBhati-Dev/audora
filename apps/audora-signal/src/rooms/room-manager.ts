import { WebSocket } from "ws";
import { v4 as uuidv4 } from "uuid";

export type ParticipantRole = "host" | "guest";

export interface Participant {
  userId: string;
  participantId: string;
  name: string;
  role: ParticipantRole;
  socketId: string;
  socket: WebSocket;
  connected: boolean;
  lastSeen: number;
}

export interface Room {
  roomId: string;
  participants: Map<string, Participant>;
  createdAt: number;
  lastActivity: number;
}

type RoomMap = Map<string, Room>;

// Singleton instance
let rooms: RoomMap = new Map();

// ─── Room Core ───────────────────────────────────────────────

export const createRoom = (roomId: string): Room => {
  const now = Date.now();
  const room: Room = {
    roomId,
    participants: new Map(),
    createdAt: now,
    lastActivity: now,
  };
  rooms.set(roomId, room);
  return room;
};

export const getRoom = (roomId: string): Room | undefined => {
  return rooms.get(roomId);
};

export const deleteRoomIfEmpty = (roomId: string): boolean => {
  const room = rooms.get(roomId);
  if (room && room.participants.size === 0) {
    rooms.delete(roomId);
    return true;
  }
  return false;
};

// ─── Participant Handling ────────────────────────────────────

export const addParticipant = (
  roomId: string,
  socket: WebSocket,
  userId: string,
  name: string,
  role: ParticipantRole
): Participant => {
  const room = rooms.get(roomId) ?? createRoom(roomId);
  const socketId = uuidv4();
  const now = Date.now();

  const participant: Participant = {
    userId,
    participantId: uuidv4(),
    name,
    role,
    socketId,
    socket,
    connected: true,
    lastSeen: now,
  };

  room.participants.set(socketId, participant);
  room.lastActivity = now;
  return participant;
};

export const removeParticipantBySocket = (
  roomId: string,
  socket: WebSocket
): void => {
  const room = rooms.get(roomId);
  if (!room) return;

  for (const [socketId, participant] of room.participants.entries()) {
    if (participant.socket === socket) {
      room.participants.delete(socketId);
      room.lastActivity = Date.now();
      break;
    }
  }

  deleteRoomIfEmpty(roomId);
};

export const updateParticipantLastSeen = (
  roomId: string,
  socketId: string
): void => {
  const room = rooms.get(roomId);
  if (!room) return;

  const participant = room.participants.get(socketId);
  if (participant) {
    participant.lastSeen = Date.now();
    room.lastActivity = Date.now();
  }
};

// ─── Broadcast Utilities ─────────────────────────────────────

export const broadcastToRoom = (
  roomId: string,
  message: any,
  excludeSocket?: WebSocket
): void => {
  const room = rooms.get(roomId);
  if (!room) return;

  const data = JSON.stringify(message);
  const now = Date.now();
  const disconnectedThreshold = 30000; // 30 seconds

  for (const participant of room.participants.values()) {
    if (
      participant.socket.readyState === WebSocket.OPEN &&
      participant.socket !== excludeSocket &&
      now - participant.lastSeen < disconnectedThreshold
    ) {
      participant.socket.send(data);
    }
  }
};

export const sendToSocket = (socket: WebSocket, message: any): boolean => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    return true;
  }
  return false;
};

// ─── Room Queries ────────────────────────────────────────────

export const getParticipants = (
  roomId: string,
  excludeSocket?: WebSocket
): Participant[] => {
  const room = rooms.get(roomId);
  if (!room) return [];

  const now = Date.now();
  const disconnectedThreshold = 30000; // 30 seconds

  return Array.from(room.participants.values()).filter(
    (p) =>
      p.socket !== excludeSocket && now - p.lastSeen < disconnectedThreshold
  );
};

export const isUserInRoom = (roomId: string, userId: string): boolean => {
  const room = rooms.get(roomId);
  if (!room) return false;

  const now = Date.now();
  const disconnectedThreshold = 30000; // 30 seconds

  return Array.from(room.participants.values()).some(
    (participant) =>
      participant.userId === userId &&
      now - participant.lastSeen < disconnectedThreshold
  );
};

export const getRoomStats = (roomId: string) => {
  const room = rooms.get(roomId);
  if (!room) return null;

  const now = Date.now();
  const disconnectedThreshold = 30000; // 30 seconds

  const activeParticipants = Array.from(room.participants.values()).filter(
    (p) => now - p.lastSeen < disconnectedThreshold
  );

  return {
    roomId,
    participantCount: activeParticipants.length,
    hostCount: activeParticipants.filter((p) => p.role === "host").length,
    guestCount: activeParticipants.filter((p) => p.role === "guest").length,
    createdAt: room.createdAt,
    lastActivity: room.lastActivity,
  };
};
