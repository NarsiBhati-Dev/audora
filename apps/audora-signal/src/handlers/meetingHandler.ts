import type { WebSocket } from "ws";
import {
  addProjectId,
  addTrackId,
  broadcastToRoom,
  removeRoom,
  updateRecordingStatus,
} from "../rooms/room-manager";
import type { InboundMessage } from "@audora/types";
import type { MeetingTokenPayload } from "../services/verifyToken";

export const meetingHandler = ({
  socket,
  meetingToken,
  message,
}: {
  socket: WebSocket;
  meetingToken: MeetingTokenPayload;
  message: InboundMessage;
}) => {
  const { type, data } = message;
  const { studioSlug } = meetingToken;

  switch (type) {
    case "mic:toggle": {
      const { micOn, socketId } = data;
      broadcastToRoom(
        studioSlug,
        {
          type: "mic:toggle",
          data: { micOn, socketId },
        },
        socket,
      );
      break;
    }
    case "cam:toggle": {
      const { camOn, socketId } = data;
      broadcastToRoom(
        studioSlug,
        {
          type: "cam:toggle",
          data: { camOn, socketId },
        },
        socket,
      );
      break;
    }
    case "project-id": {
      const { projectId } = data;
      addProjectId(studioSlug, socket, projectId);
      break;
    }
    case "track-id": {
      const { trackId } = data;
      addTrackId(studioSlug, socket, trackId);
      break;
    }
    case "recording:start": {
      const { recordingStatus } = data;
      updateRecordingStatus(studioSlug, socket, recordingStatus);
      break;
    }
    case "recording:stop": {
      const { recordingStatus } = data;
      updateRecordingStatus(studioSlug, socket, recordingStatus);
      break;
    }
    default: {
      console.warn(`[meetingHandler] Unhandled type: ${type}`);
      break;
    }
  }
};
