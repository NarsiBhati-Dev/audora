import { WebSocket } from "ws";
import { v4 as uuidv4 } from "uuid";

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

const removeParticipantBySocket = (room: Room, socket: WebSocket): Room => {
  const newParticipants = new Map(
    Array.from(room.participants.entries()).filter(
      ([, entry]) => entry.socket !== socket
    )
  );
  return { ...room, participants: newParticipants };
};

const removeParticipantById = (room: Room, socketId: string): Room => {
  const newParticipants = new Map(room.participants);
  newParticipants.delete(socketId);
  return { ...room, participants: newParticipants };
};

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

const isRoomEmpty = (room: Room): boolean => room.participants.size === 0;

const getParticipantCount = (room: Room): number => room.participants.size;

const getParticipantMeta = (
  room: Room,
  socketId: string
): Participant | undefined => room.participants.get(socketId)?.meta;

export const createRoomManager = () => {
  let rooms: RoomMap = new Map();

  const getOrCreateRoom = (roomId: string): Room => {
    if (!rooms.has(roomId)) {
      rooms.set(roomId, createRoom(roomId));
    }
    return rooms.get(roomId)!;
  };

  const updateRoom = (roomId: string, updater: (room: Room) => Room) => {
    const room = rooms.get(roomId);
    if (!room) return;
    const updatedRoom = updater(room);
    rooms.set(roomId, updatedRoom);
  };

  const removeRoomIfEmpty = (roomId: string) => {
    const room = rooms.get(roomId);
    if (room && isRoomEmpty(room)) {
      rooms.delete(roomId);
    }
  };

  const getRoom = (roomId: string): Room | undefined => rooms.get(roomId);

  const removeParticipantFromAllRooms = (socket: WebSocket) => {
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
    updateRoom,
    removeRoomIfEmpty,
    getRoom,
    removeParticipantFromAllRooms,
  };
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

const isUserStillDisconnected = (room: Room, userId: string): boolean => {
  for (const { meta } of room.participants.values()) {
    if (meta.userId === userId && (meta as any).disconnected === true) {
      return true;
    }
  }
  return false;
};

const markParticipantDisconnected = (room: Room, socket: WebSocket): Room => {
  const updatedParticipants = new Map(room.participants);

  for (const [socketId, entry] of updatedParticipants.entries()) {
    if (entry.socket === socket) {
      (entry.meta as any).disconnected = true;
      updatedParticipants.set(socketId, entry);
      break;
    }
  }

  return { ...room, participants: updatedParticipants };
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

// Export room utilities if needed externally
export const RoomUtils = {
  addParticipant,
  removeParticipantById,
  removeParticipantBySocket,
  broadcast,
  getOtherSocket,
  isRoomEmpty,
  getParticipantCount,
  getParticipantMeta,
  removeParticipantByUserId,
  isUserStillDisconnected,
  markParticipantDisconnected,
  getSocketByUserId,
};
