import { WebSocketServer } from "ws";
import { PORT } from "./config";
import { connectionHandler } from "./handlers/connection";

const wss = new WebSocketServer({ port: PORT });

connectionHandler(wss);
