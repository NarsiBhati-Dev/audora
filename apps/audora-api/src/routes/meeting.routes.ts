import { Router } from "express";
import { generateMeetingTokenController } from "../controllers/meeting.controller";

export const meetingRoutes = Router();

meetingRoutes.post("/generate-token", generateMeetingTokenController);

export default meetingRoutes;
