import { WebSocket } from "ws";

export interface OutgoingMessage {
  type: string;
  data: any;
}

// roomId => Set of clients
const rooms = new Map<string, Set<WebSocket>>();

// Add a user to a room
export const addUserToRoom = (socket: WebSocket, roomId: string) => {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  rooms.get(roomId)!.add(socket);
};

// Remove a user from a specific room
export const removeUserFromRoom = (socket: WebSocket, roomId: string) => {
  const clients = rooms.get(roomId);
  if (!clients) return;

  clients.delete(socket);
  if (clients.size === 0) rooms.delete(roomId);
};

// Clean up user from all rooms (e.g., on disconnect)
export const removeUserFromAllRooms = (socket: WebSocket) => {
  for (const [roomId, clients] of rooms.entries()) {
    if (clients.has(socket)) {
      clients.delete(socket);
      if (clients.size === 0) rooms.delete(roomId);
    }
  }
};

// Check if a room exists and is empty
export const isRoomEmpty = (roomId: string): boolean => {
  return !rooms.has(roomId) || rooms.get(roomId)!.size === 0;
};

// Check if a specific user is in a room
export const isUserInRoom = (socket: WebSocket, roomId: string): boolean => {
  return rooms.get(roomId)?.has(socket) || false;
};

// Get all users (WebSockets) in a room
export const getUsersInRoom = (roomId: string): WebSocket[] => {
  return rooms.get(roomId) ? Array.from(rooms.get(roomId)!) : [];
};

// Get total number of users in a room
export const getTotalUsersInRoom = (roomId: string): number => {
  return rooms.get(roomId)?.size || 0;
};

// Broadcast to everyone in a room except (optional) one socket
export const broadcastToRoom = (
  roomId: string,
  message: OutgoingMessage,
  excludeSocket?: WebSocket
) => {
  const data = JSON.stringify(message);
  const clients = rooms.get(roomId);
  if (!clients) return;

  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN && client !== excludeSocket) {
      client.send(data);
    }
  }
};
