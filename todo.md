# steps

1.  Connection Handling:
    Use efficient WebSocket libraries and tune your server for high concurrency (e.g., Node.js cluster mode, or a high-performance runtime like Go or Rust if you ever migrate).

2.  Message Batching & Compression:
    For high-frequency signaling, consider batching messages or using compression (e.g., permessage-deflate for WebSockets).

3.  Feature Enhancements
    TURN/STUN Coordination:
    Optionally, help clients discover the best TURN/STUN servers dynamically.
    Reconnect & Recovery:
    Implement robust reconnection logic for clients, and consider “ghost user” cleanup for users who disconnect unexpectedly.
    Metrics & Analytics:
    Track metrics like connection counts, message rates, room sizes, and error rates for capacity planning and debugging.

Load Testing:
Use tools like Artillery or custom scripts to simulate thousands of concurrent connections and measure performance.

## plan

Here’s a step-by-step implementation plan for adding SFU-based composite recording (like Google Meet/Zoom) to your codebase, tailored to your structure:

---

## **Step 1: SFU Stream Routing Enhancements**

1. **Review/Refactor SFU Core**

   - Go to `apps/audora-signal/src/handlers/` (likely `meetingHandler.ts` or `roomHandler.ts`).
   - Ensure the SFU can:
     - Accept incoming WebRTC streams from all clients.
     - Forward each stream to all other clients in the same room.
     - Maintain a mapping of rooms and participants.

2. **Add Support for “Bot” Participants**
   - Allow a special “recording bot” to join any room as a hidden participant.
   - When the bot joins, forward all participant streams to it (just like a regular participant).

---

## **Step 2: Recording Bot Implementation**

1. **Create a Recording Bot Service**

   - In `apps/audora-worker/` or as a new service, implement a bot that:
     - Connects to the SFU as a participant (using the same signaling protocol as clients).
     - Subscribes to all media streams in the room.

2. **Media Ingestion**
   - The bot receives all video/audio streams via WebRTC.
   - Use a media framework (e.g., ffmpeg, GStreamer, or a Node.js library) to ingest these streams.

---

## **Step 3: Composite Recording Pipeline**

1. **Video Composition**

   - Use ffmpeg, GStreamer, or a similar tool to:
     - Render all video streams into a single canvas (grid, speaker view, etc.).
     - Dynamically update the layout as participants join/leave.

2. **Audio Mixing**

   - Mix all incoming audio streams into a single track.

3. **Encoding & Storage**
   - Encode the composite output (e.g., H.264 for video, Opus/AAC for audio).
   - Store the final file in persistent storage (e.g., local disk, S3, etc.).

---

## **Step 4: Frontend Adjustments**

1. **WebRTC Publishing**

   - In `apps/audora-frontend/src/modules/webrtc/`, ensure each client:
     - Publishes their media stream to the SFU.
     - Can handle multiple incoming streams (one per participant).

2. **Bot Visibility**
   - Ensure the recording bot is not shown in the participant list/UI.

---

## **Step 5: Signaling Protocol Updates**

1. **Bot Signaling**

   - Update your signaling protocol (in both SFU and frontend) to support bot participants.
   - Ensure the bot can join/leave rooms and receive all streams.

2. **Room/Participant Management**
   - Update room management logic to handle dynamic participant lists, including the bot.

---

## **Step 6: Testing & Optimization**

1. **Simulate Multi-User Sessions**

   - Test with multiple clients and the bot joining a room.
   - Verify all streams are routed correctly and the bot receives them.

2. **Composite Output Validation**

   - Check the final recording for:
     - Correct video layout.
     - Synchronized and mixed audio.
     - Handling of join/leave events.

3. **Performance Tuning**
   - Monitor CPU/memory usage of the recording pipeline.
   - Optimize for scale (consider GPU acceleration or distributed processing if needed).

---

## **Step 7: Productionization**

1. **Error Handling & Monitoring**

   - Add robust error handling in the SFU and bot.
   - Integrate logging and monitoring (e.g., Prometheus, Grafana).

2. **Security**

   - Ensure only authorized bots can join rooms.
   - Use secure signaling and media transport (WSS, DTLS/SRTP).

3. **User Access to Recordings**
   - Provide a way for users to access/download recordings (API endpoint, dashboard, etc.).

---

## **Summary Table**

| Step | Task                                     | Codebase Location                     |
| ---- | ---------------------------------------- | ------------------------------------- |
| 1    | SFU stream routing & bot support         | `audora-signal/src/handlers/`         |
| 2    | Recording bot implementation             | `audora-worker/` or new service       |
| 3    | Composite recording pipeline             | Recording bot + ffmpeg/GStreamer      |
| 4    | Frontend WebRTC & UI adjustments         | `audora-frontend/src/modules/webrtc/` |
| 5    | Signaling protocol updates               | SFU + frontend signaling logic        |
| 6    | Testing & optimization                   | All relevant modules                  |
| 7    | Productionization (monitoring, security) | All relevant modules                  |

---

**If you want a detailed breakdown or code samples for any step, let me know which one to start with!**
