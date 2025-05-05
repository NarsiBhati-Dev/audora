# Audora - Riverside.fm Clone

Audora is a web app designed to record high-quality audio and video podcasts, leveraging real-time communication and robust backend processing. The project aims to replicate the functionality of Riverside.fm, focusing on learning WebRTC, video processing, real-time uploads, and ensuring high reliability, especially in terms of S3 multipart uploads and video rendering.

## Tech Stack

- **Frontend**: Next.js (React), Tailwind CSS
- **Real-time Communication**: WebRTC, WebSocket (Socket.IO for signaling)
- **Recording**: MediaRecorder API
- **Uploads**: S3 Multipart, Presigned URLs
- **Backend**: Node.js (Express/Fastify), FFmpeg/GStreamer for video processing
- **Queue Processing**: BullMQ or Temporal (for video render jobs)
- **Storage**: AWS S3
- **Database**: PostgreSQL (via Prisma)
- **DevOps**: Docker, CI/CD, Monitoring (Sentry, Grafana)

## Features

### Core Features

1. **WebRTC Communication**

   - Real-time video/audio communication.
   - Support for multiple participants in a room.
   - Browser-based peer-to-peer connection.

2. **Media Recording & Upload**

   - Record video/audio using the MediaRecorder API.
   - Real-time uploads via S3 multipart uploads (supports resume/retry).

3. **Post-Processing**

   - Video and audio transcoding with FFmpeg/GStreamer.
   - Ability to stitch recordings, normalize audio, and add branding overlays.

4. **Session Management**
   - Generate room links.
   - Track session states (live, uploading, processing).
   - Reconnect logic for users who drop from the session.

### Planned Features

1. **UI for Session Playback**

   - Display past recordings with playback functionality.
   - Option to download or stream finalized content.

2. **Scalability & Reliability**
   - Horizontal scaling for signaling server.
   - Background queue processing for video rendering jobs (BullMQ/Temporal).
   - Caching for uploads and transcoding jobs.

## Development Roadmap

### Week 1: Core WebRTC and Signaling Server

- Set up signaling server with WebSocket (Socket.IO).
- Implement WebRTC peer connections and room management.

### Week 2: Media Recording and Uploads

- Implement recording functionality with MediaRecorder API.
- Integrate real-time S3 multipart uploads.

### Week 3: Video Processing and Post-Processing

- Implement FFmpeg/GStreamer-based processing for audio/video stitching and transcoding.
- Add overlays and audio normalization.

### Week 4: Reliability and Testing

- Implement reconnect logic for WebRTC and upload retries.
- Test edge cases (internet drops, failed uploads, reconnection).

### Week 5: Polish and Deployment

- Enhance UI/UX for better user experience.
- Deploy to production with monitoring tools (e.g., Sentry, Grafana).

## Contributing

If you want to contribute to this project, feel free to fork the repo, make changes, and create a pull request. Please ensure your code passes linting and tests before submitting.

## License

This project is licensed under the MIT License.
