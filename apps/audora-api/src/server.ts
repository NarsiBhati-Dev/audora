import express, { type Request, type Response } from "express";
import cors from "cors";
import { PORT, FRONTEND_URL } from "./config/env";

// import routers
import authRouter from "./routes/auth.routes";
import profileRouter from "./routes/profile.routes";

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

app.listen(PORT, () => {
  console.log(`[ server ] is listening on : http://localhost:${PORT}`);
});
