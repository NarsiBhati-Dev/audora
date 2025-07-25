import express, { type Request, type Response } from "express";
import cors from "cors";
import { PORT, FRONTEND_URL } from "./config/env";

// import routers
import authRouter from "./routes/auth.routes";
import profileRouter from "./routes/profile.routes";
import studioRouter from "./routes/studio.routes";
import projectRouter from "./routes/project.routes";
import meetingRouter from "./routes/meeting.routes";
import recordingRouter from "./routes/recording.routes";
import trackRouter from "./routes/track.routes";

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://www.audora.xyz", FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Audora!",
  });
});

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/studio", studioRouter);
app.use("/meeting", meetingRouter);
app.use("/project", projectRouter);
app.use("/track", trackRouter);
app.use("/recording", recordingRouter);

app.listen(PORT, () => {
  console.log(`[ server ] is listening on : http://localhost:${PORT}`);
});
