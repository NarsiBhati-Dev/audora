# signaling-server

The `signaling-server` is the WebSocket signaling layer of **Audora**, used for establishing peer-to-peer connections via WebRTC.

It facilitates the exchange of:

- Session Description Protocol (SDP) offers/answers
- ICE candidates
- Room and participant coordination

Built with **Bun**, **TypeScript**, and **ws** (WebSocket library).

---

## 📦 Setup

To install dependencies:

```bash
bun install
```

---

## 🚀 Run the Signaling Server

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.12. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

---

## 📁 Structure

```
signaling-server/
├── src/
│   ├── server.ts         # WebSocket server setup
│   ├── handlers/         # Message types (offer, answer, candidate, etc.)
│   ├── utils/            # Room/user management helpers
│   └── index.ts          # Entry point
├── tsconfig.json
├── .env
└── README.md
```

---

## 🔐 Environment Variables

Example `.env`:

```env
PORT=8001
```

---

## 🧠 Technologies

- [Bun](https://bun.sh)
- [ws](https://github.com/websockets/ws)
- WebRTC signaling concepts

---
