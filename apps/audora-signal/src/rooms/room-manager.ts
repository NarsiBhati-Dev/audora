import { WebSocket } from "ws";
import { v4 as uuidv4 } from "uuid";

// --------------------
// Types
// --------------------
export interface Participant {
  userId: string;
  role: "host" | "guest";
  name: string;
  socketId: string;
}

interface ParticipantEntry {
  socket: WebSocket;
  meta: Participant;
}

export interface Room {
  roomId: string;
  participants: Map<string, ParticipantEntry>;
}

type RoomMap = Map<string, Room>;

// --------------------
// Room & Participant Utilities
// --------------------

const createRoom = (roomId: string): Room => ({
  roomId,
  participants: new Map(),
});

const addParticipant = (
  room: Room,
  socket: WebSocket,
  participant: Omit<Participant, "socketId">
): [Room, string] => {
  const socketId = uuidv4();
  const fullParticipant: Participant = { ...participant, socketId };
  const newParticipants = new Map(room.participants);
  newParticipants.set(socketId, { socket, meta: fullParticipant });
  return [{ ...room, participants: newParticipants }, socketId];
};

const removeParticipantById = (room: Room, socketId: string): Room => {
  const newParticipants = new Map(room.participants);
  newParticipants.delete(socketId);
  return { ...room, participants: newParticipants };
};

const removeParticipantBySocket = (room: Room, socket: WebSocket): Room => {
  const newParticipants = new Map(
    Array.from(room.participants.entries()).filter(
      ([, entry]) => entry.socket !== socket
    )
  );
  return { ...room, participants: newParticipants };
};

const removeParticipantByUserId = (room: Room, userId: string): Room => {
  const newParticipants = new Map(room.participants);
  for (const [socketId, { meta }] of newParticipants.entries()) {
    if (meta.userId === userId) {
      newParticipants.delete(socketId);
      break;
    }
  }
  return { ...room, participants: newParticipants };
};

// --------------------
// Disconnection Utilities
// --------------------

const markParticipantDisconnected = (room: Room, socket: WebSocket): Room => {
  const updatedParticipants = new Map(room.participants);
  for (const [socketId, entry] of updatedParticipants.entries()) {
    if (entry.socket === socket) {
      (entry.meta as any).disconnected = true;
      break;
    }
  }
  return { ...room, participants: updatedParticipants };
};

const isUserStillDisconnected = (room: Room, userId: string): boolean => {
  for (const { meta } of room.participants.values()) {
    if (meta.userId === userId && (meta as any).disconnected === true) {
      return true;
    }
  }
  return false;
};

const isUserInRoom = (room: Room, userId: string): boolean => {
  for (const { meta } of room.participants.values()) {
    if (meta.userId === userId) {
      return true;
    }
  }
  return false;
};

// --------------------
// Broadcast Utilities
// --------------------

const broadcast = (
  room: Room,
  message: any,
  excludeSocket?: WebSocket
): void => {
  const data = JSON.stringify(message);
  for (const { socket } of room.participants.values()) {
    if (socket.readyState === WebSocket.OPEN && socket !== excludeSocket) {
      socket.send(data);
    }
  }
};

const broadcastToSpecificSocket = (
  // room: Room,
  message: any,
  socket: WebSocket
): void => {
  const data = JSON.stringify(message, null, 2);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(data);
  }
};

const broadcastToHost = (room: Room, message: any): void => {
  const hostSocket = getSocketByUserId(room, "host");
  if (!hostSocket) return;
  broadcastToSpecificSocket(message, hostSocket);
};

// --------------------
// Getters
// --------------------

const getOtherSocket = (
  room: Room,
  excludeSocketId: string
): WebSocket | null => {
  for (const [socketId, { socket }] of room.participants.entries()) {
    if (socketId !== excludeSocketId && socket.readyState === WebSocket.OPEN) {
      return socket;
    }
  }
  return null;
};

const getSocketByUserId = (
  room: Room,
  userId: string
): WebSocket | undefined => {
  for (const { socket, meta } of room.participants.values()) {
    if (meta.userId === userId) {
      return socket;
    }
  }
  return undefined;
};

const getParticipantMeta = (
  room: Room,
  socketId: string
): Participant | undefined => room.participants.get(socketId)?.meta;

const serializeParticipants = (room: Room, excludeSocket?: WebSocket) => {
  return Array.from(room.participants.values())
    .filter(({ socket }) => socket !== excludeSocket)
    .map(({ meta }) => ({
      userId: meta.userId,
      name: meta.name,
      role: meta.role,
      socketId: meta.socketId,
    }));
};

const getParticipantCount = (room: Room): number => room.participants.size;

const isRoomEmpty = (room: Room): boolean => room.participants.size === 0;

// --------------------
// Room Manager
// --------------------

export const createRoomManager = () => {
  let rooms: RoomMap = new Map();

  const getOrCreateRoom = (roomId: string): Room => {
    if (!rooms.has(roomId)) {
      rooms.set(roomId, createRoom(roomId));
    }
    return rooms.get(roomId)!;
  };

  const getRoom = (roomId: string): Room | undefined => rooms.get(roomId);

  const updateRoom = (roomId: string, updater: (room: Room) => Room): void => {
    const room = rooms.get(roomId);
    if (!room) return;
    const updated = updater(room);
    rooms.set(roomId, updated);
  };

  const removeRoomIfEmpty = (roomId: string): void => {
    const room = rooms.get(roomId);
    if (room && isRoomEmpty(room)) {
      rooms.delete(roomId);
    }
  };

  const removeParticipantFromAllRooms = (socket: WebSocket): void => {
    for (const [roomId, room] of rooms.entries()) {
      const updatedRoom = removeParticipantBySocket(room, socket);
      if (isRoomEmpty(updatedRoom)) {
        rooms.delete(roomId);
      } else {
        rooms.set(roomId, updatedRoom);
      }
    }
  };

  return {
    getOrCreateRoom,
    getRoom,
    updateRoom,
    removeRoomIfEmpty,
    removeParticipantFromAllRooms,
  };
};

// --------------------
// Exported Utilities
// --------------------

export const RoomUtils = {
  addParticipant,
  removeParticipantById,
  removeParticipantBySocket,
  removeParticipantByUserId,
  markParticipantDisconnected,
  isUserStillDisconnected,
  broadcast,
  broadcastToSpecificSocket,
  broadcastToHost,
  getOtherSocket,
  getSocketByUserId,
  getParticipantMeta,
  getParticipantCount,
  isRoomEmpty,
  isUserInRoom,
  serializeParticipants,
};
