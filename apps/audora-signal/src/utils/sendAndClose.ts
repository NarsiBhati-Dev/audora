import WebSocket from "ws";

export const sendAndClose = (
  socket: WebSocket,
  type: string,
  message: string,
) => {
  socket.send(JSON.stringify({ type, data: { message } }));
  socket.close();
};
