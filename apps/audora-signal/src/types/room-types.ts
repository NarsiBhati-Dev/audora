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
  host?: Participant;
  guest?: Participant;
}
