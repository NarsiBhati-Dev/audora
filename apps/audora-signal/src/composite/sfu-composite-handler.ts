// import WebSocket, { WebSocketServer } from "ws";
// import { v4 as uuidv4 } from "uuid";

// // Room and participant management
// interface Participant {
//   id: string;
//   ws: WebSocket;
//   isBot: boolean;
// }

// interface Room {
//   id: string;
//   participants: Map<string, Participant>;
// }

// const rooms: Map<string, Room> = new Map();

// // Util: Broadcast signaling messages to all participants except sender
// function broadcastToRoom(room: Room, senderId: string, message: any) {
//   for (const [pid, participant] of room.participants) {
//     if (pid !== senderId) {
//       participant.ws.send(JSON.stringify(message));
//     }
//   }
// }

// // Util: Forward signaling messages to the bot
// function forwardToBot(room: Room, message: any) {
//   for (const participant of room.participants.values()) {
//     if (participant.isBot) {
//       participant.ws.send(JSON.stringify(message));
//     }
//   }
// }

// // WebSocket server for SFU composite prototype
// const wss = new WebSocketServer({ port: 8081 });

// wss.on("connection", (ws: WebSocket) => {
//   let currentRoom: Room | null = null;
//   let participantId: string = uuidv4();
//   let isBot = false;

//   ws.on("message", (data) => {
//     let msg: any;
//     try {
//       msg = JSON.parse(data.toString());
//     } catch (e) {
//       ws.send(JSON.stringify({ type: "error", error: "Invalid JSON" }));
//       return;
//     }

//     switch (msg.type) {
//       case "join": {
//         // msg: { type: 'join', roomId: string, isBot?: boolean }
//         const { roomId, isBot: botFlag } = msg;
//         isBot = !!botFlag;
//         let room = rooms.get(roomId);
//         if (!room) {
//           room = { id: roomId, participants: new Map() };
//           rooms.set(roomId, room);
//         }
//         room.participants.set(participantId, { id: participantId, ws, isBot });
//         currentRoom = room;
//         ws.send(JSON.stringify({ type: "joined", participantId }));
//         // Notify others
//         broadcastToRoom(room, participantId, {
//           type: "participant-joined",
//           participantId,
//           isBot,
//         });
//         break;
//       }
//       case "signal": {
//         // msg: { type: 'signal', to: participantId, data: any }
//         if (!currentRoom) return;
//         const target = currentRoom.participants.get(msg.to);
//         if (target) {
//           target.ws.send(
//             JSON.stringify({
//               type: "signal",
//               from: participantId,
//               data: msg.data,
//             })
//           );
//         }
//         break;
//       }
//       case "broadcast-signal": {
//         // msg: { type: 'broadcast-signal', data: any }
//         if (!currentRoom) return;
//         broadcastToRoom(currentRoom, participantId, {
//           type: "signal",
//           from: participantId,
//           data: msg.data,
//         });
//         // Also forward to bot
//         forwardToBot(currentRoom, {
//           type: "signal",
//           from: participantId,
//           data: msg.data,
//         });
//         break;
//       }
//       default:
//         ws.send(
//           JSON.stringify({ type: "error", error: "Unknown message type" })
//         );
//     }
//   });

//   ws.on("close", () => {
//     if (currentRoom) {
//       currentRoom.participants.delete(participantId);
//       broadcastToRoom(currentRoom, participantId, {
//         type: "participant-left",
//         participantId,
//       });
//       // Clean up room if empty
//       if (currentRoom.participants.size === 0) {
//         rooms.delete(currentRoom.id);
//       }
//     }
//   });
// });

// console.log(
//   "SFU Composite Handler WebSocket server running on ws://localhost:8081"
// );
