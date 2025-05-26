import WebSocket from "ws";
import { TrackSessionMap } from "./TrackSessionMap.js";
import { generateStitchPlan } from "./generateStitchPlan.js";

interface IncomingMessage {
  type: string;
  userId: string;
  timestamp: number;
  chunkUrl?: string;
  start?: number;
  end?: number;
}

const sessionMap = new TrackSessionMap();

export function handleWebSocket(ws: WebSocket) {
  ws.on("message", (data) => {
    try {
      const message: IncomingMessage = JSON.parse(data.toString());

      switch (message.type) {
        case "join":
          sessionMap.addUser(message.userId, message.timestamp);
          break;

        case "leave":
          sessionMap.markUserLeft(message.userId, message.timestamp);
          break;

        case "record-start":
          sessionMap.startRecording(message.userId, message.timestamp);
          break;

        case "record-stop":
          sessionMap.stopRecording(message.userId, message.timestamp);
          break;

        case "chunk-uploaded":
          if (message.chunkUrl && message.start && message.end) {
            sessionMap.addChunk(
              message.userId,
              message.chunkUrl,
              message.start,
              message.end
            );
          }
          break;

        case "session-end":
          const stitchPlan = generateStitchPlan(
            new Map(
              sessionMap
                .getUserTracks()
                .map(([userId, chunks]) => [userId, chunks])
            )
          );
          console.log(
            "Generated Stitch Plan:",
            JSON.stringify(stitchPlan, null, 2)
          );
          break;
      }
    } catch (error) {
      console.error("Invalid message format or processing error:", error);
    }
  });
}
