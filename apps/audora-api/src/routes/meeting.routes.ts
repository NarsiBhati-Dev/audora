import { Router } from "express";
import {
  createMeeting,
  getMeeting,
  verifyMeeting,
} from "../controllers/meeting.controller";
import { auth } from "../middleware/auth";
import { verifyLimiter } from "../middleware/rateLimiters";

export const meetingRoutes = Router();
meetingRoutes.post("/verify", verifyLimiter, verifyMeeting);
meetingRoutes.post("/get", verifyLimiter, getMeeting);

meetingRoutes.use(auth);
meetingRoutes.post("/create", createMeeting);
