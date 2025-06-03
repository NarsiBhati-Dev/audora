import { WebSocketServer } from "ws";
import { PORT } from "./config";
import { setupSignalingServer } from "./handlers/signalingServer";

const wss = new WebSocketServer({ port: PORT });

setupSignalingServer(wss);
