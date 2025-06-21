import { WebSocket } from "ws";
import type { MeetingTokenPayload } from "../services/verifyToken";

export interface SocketWithMeta extends WebSocket {
  meta?: MeetingTokenPayload & { socketId: string };
}
