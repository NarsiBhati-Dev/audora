import { WebSocketServer } from "ws";
import { PORT } from "./config";
import { setupSignalingServer } from "./handlers/setupServer";

const wss = new WebSocketServer({ port: PORT });

setupSignalingServer(wss);
